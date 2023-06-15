import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from '@angular/fire/auth';

import { BehaviorSubject, Subject, Subscription, Observable } from 'rxjs';
import { UsuarioRepositoryService } from './usuario-repository.service';
import { FirebaseError } from '@angular/fire/app';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioLogService } from './usuario-log.service';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { EspecialistaRepositoryService } from '../Especialista/especialista-repository.service';
import { PacienteRepositoryService } from '../Paciente/paciente-repository.service';
import { Router } from '@angular/router';
import { ProfileImageService } from '../File/profile-image.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  listadoUsuariosModelo?: Usuario[];
  listadoEspecialistas?: Especialista[];

  listadoPacientes?: Paciente[];
  subscription?: Subscription;

  constructor(
    private afAuth: Auth,
    private _usuariosRepository: UsuarioRepositoryService,
    private _usuarioLogService: UsuarioLogService,
    private _especialsitasRepositoryService: EspecialistaRepositoryService,
    private _pacientesRepositoryService: PacienteRepositoryService,
    private _imageService: ProfileImageService,
    private _router: Router
  ) {
    if (!this.subscription) {
      this.subscription = this._usuariosRepository.listadoUsuarios$.subscribe(
        (data) => {
          this.listadoUsuariosModelo = data;
        }
      );

      this._especialsitasRepositoryService.getAll().subscribe((data) => {
        this.listadoEspecialistas = data;
      });

      this._pacientesRepositoryService.getAll().subscribe((data) => {
        this.listadoPacientes = data;
      });
    }
  }

  //metodo encargado de registrar un usuario que viene en el componente register
  async register(
    usuarioRegistro: Usuario,
    especialista?: Especialista,
    paciente?: Paciente,
    images?: File[]
  ): Promise<{ mensaje: string; valido: boolean }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.afAuth,
        usuarioRegistro.mail,
        usuarioRegistro.password
      );

      // guardo las imagenes
      this._imageService.saveImages(images!, userCredential.user.uid);

      //obtengo las url de descarga
      let getImagesUrl: any = [];

      setTimeout(async () => {
        getImagesUrl = await this._imageService.getImagesById(
          userCredential.user.uid
        );

        usuarioRegistro.imagenPerfil1 = getImagesUrl[0];

        let userDocRef = this._usuariosRepository.create(
          usuarioRegistro,
          userCredential.user.uid
        );

        if (usuarioRegistro.rol === 'especialista') {
          especialista!.idUsuarioDocRef = userDocRef;
          especialista!.imagenPerfil1 = getImagesUrl[0];
          this._especialsitasRepositoryService.create(
            especialista!,
            userCredential.user.uid
          );
        } else if (usuarioRegistro.rol === 'paciente') {
          paciente!.idUsuarioDocRef = userDocRef;
          paciente!.imagenPerfil1 = getImagesUrl[0];
          paciente!.imagenPerfil2 = getImagesUrl[1];
          this._pacientesRepositoryService.create(
            paciente!,
            userCredential.user.uid
          );
        }

        await sendEmailVerification(userCredential.user);
      }, 4000);

      return {
        mensaje: 'Usuario creado correctamente, por favor verifica el mail',
        valido: true,
      };
    } catch (err) {
      console.log(err);
      let errorMensaje = 'Hubo un error al intentar registrarte';
      if (err instanceof FirebaseError) {
        if (err.code == 'auth/email-already-in-use') {
          errorMensaje = 'El email ingresado ya existe, ingrese otro';
        }
      }
      return { mensaje: errorMensaje, valido: false };
    }
  }
  // metodo encargado de inicar sesion
  async login(
    usuarioLogin: any
  ): Promise<{ mensaje: string; valido: boolean }> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.afAuth,
        usuarioLogin.email,
        usuarioLogin.password
      );

      if (!userCredential.user.emailVerified) {
        throw new FirebaseError(
          'auth/invalid-email-verified',
          'El mail no se encuentra verificado'
        );
      }

      let usuario = this.listadoUsuariosModelo!.find(
        (user) => user.mail == usuarioLogin.email
      )!;

      if (!usuario) {
        throw new FirebaseError('auth/error', 'Su cuenta a sido eliminada.');
      }

      if (usuario.estado === 'ingreso' && usuario.rol === 'especialista') {
        throw new Error(
          'Especialista, debe esperar a ser admitido por el administrador'
        );
      }

      if (usuario.rol === 'especialista') {
        let especialista = this.listadoEspecialistas!.find(
          (esp) => esp.idUsuarioDocRef === usuario.idUsuarioDocRef
        );
        this.setUserToLocalStorage(usuario!);
        this.setUserProfileToLocalStorage(especialista!);
      } else if (usuario.rol === 'paciente') {
        let paciente = this.listadoPacientes!.find(
          (pac) => pac.idUsuarioDocRef === usuario.idUsuarioDocRef
        );

        this.setUserToLocalStorage(usuario!);
        this.setUserProfileToLocalStorage(paciente!);
      } else {
        this.setUserToLocalStorage(usuario);
      }

      this._usuarioLogService.log(
        usuario.idUsuarioUid!,
        usuario.idUsuarioDocRef!
      );

      return { mensaje: 'Usuario logueado correctamente', valido: true };

      //return true;
    } catch (err) {
      console.log(err);
      let errorMensaje =
        'Hubo un error al intentar iniciar sesión, intenta más tarde';
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/user-not-found':
            errorMensaje = 'El usuario ingresado no existe';
            break;
          case 'auth/wrong-password':
            errorMensaje = 'La contraseña ingresada no es válida';
            break;
          case 'auth/too-many-requests':
            errorMensaje =
              'Has excedido el limite de intentos de inicio de sesión';
            break;
          case 'auth/invalid-email-verified':
            errorMensaje =
              'Tu mail todavía no ha sido verificado, hazlo para poder ingresar a tu cuenta';
            break;
          case 'auth/invalid-provider-data':
            errorMensaje =
              'Especialista, debe esperar a ser admitido por el administrador';
            break;
          case 'auth/error':
            errorMensaje = 'Su cuenta ha sido borrada por el administrador';
            break;
        }
      }
      return { mensaje: errorMensaje, valido: false };
    }
  }

  async userExist(mail: string): Promise<Boolean | undefined> {
    return this.listadoUsuariosModelo?.some((usr) => usr.mail == mail);
  }

  // metodo utilizado para iniciar sesion
  setUserToLocalStorage(data: Usuario | Paciente | Especialista) {
    const currentUserFromLocalStorage = localStorage.getItem('currentUser');
    let usrStringify = JSON.stringify(data);

    if (currentUserFromLocalStorage == null) {
      localStorage.setItem('currentUser', usrStringify);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', usrStringify);
    }
  }

  setUserProfileToLocalStorage(data: Especialista | Paciente) {
    const currentUserFromLocalStorage = localStorage.getItem('user-profile');
    let usrStringify = JSON.stringify(data);

    if (currentUserFromLocalStorage == null) {
      localStorage.setItem('user-profile', usrStringify);
    } else {
      localStorage.removeItem('user-profile');
      localStorage.setItem('user-profile', usrStringify);
    }
  }

  //obtiene los datos del usuario que se encuentra con la sesion iniciada
  getCurrentUserLocalStorage(): any | null {
    const currentUserFromLocalStorage = localStorage.getItem('currentUser');
    if (currentUserFromLocalStorage != null) {
      let usr = JSON.parse(currentUserFromLocalStorage);

      return usr;
    }
    return null;
  }

  getCurrentUserProfileLocalStorage(): any | null {
    const currentUserFromLocalStorage = localStorage.getItem('user-profile');
    if (currentUserFromLocalStorage != null) {
      let usr = JSON.parse(currentUserFromLocalStorage);

      return usr;
    }
    return null;
  }

  // elimina el usuario que inicio sesion en el local storage
  deleteUserFromLocalStorage(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user-profile');
  }
  //verifica que el usuario haya inciaido sesion
  isLoggedIn(): boolean {
    return this.getCurrentUserLocalStorage() != null;
  }

  isLoggedInAndAdmin(): boolean {
    let response = this.getCurrentUserLocalStorage();

    if (!response) {
      return false;
    }

    if (response.rol === 'admin') {
      return true;
    }

    return false;
  }

  isLoggedAndPaciente(): boolean {
    let response = this.getCurrentUserLocalStorage();

    if (!response) {
      return false;
    }

    if (response.rol === 'paciente') {
      return true;
    }

    return false;
  }

  isLoggedAndEspecialista(): boolean {
    let response = this.getCurrentUserLocalStorage();

    if (!response) {
      return false;
    }

    if (response.rol === 'especialista') {
      return true;
    }

    return false;
  }
}
