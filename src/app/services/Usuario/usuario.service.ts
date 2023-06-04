import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser

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

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {


  listadoUsuariosModelo?: Usuario[];
  subscription?: Subscription;

  constructor(private afAuth: Auth,private _usuariosRepository: UsuarioRepositoryService, private _usuarioLogService: UsuarioLogService, private _especialsitasRepositoryService: EspecialistaRepositoryService, private _pacientesRepositoryService: PacienteRepositoryService,
    private _router: Router) {
    if(!this.subscription){
      this.subscription = this._usuariosRepository.listadoUsuarios$.subscribe((data) => {
        this.listadoUsuariosModelo =  data;
      });
    }
  }

  //metodo encargado de registrar un usuario que viene en el componente register
  async register(usuarioRegistro: Usuario, especialista?:Especialista, paciente?:Paciente )
  : Promise<{mensaje:string, valido:boolean}> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.afAuth,
        usuarioRegistro.mail,
        usuarioRegistro.password
      );



      let userDocRef = this._usuariosRepository.create(usuarioRegistro, userCredential.user.uid);

      if(usuarioRegistro.rol === "especialista"){
        especialista!.docRefUsuario = userDocRef;
        this._especialsitasRepositoryService.create(especialista!, userCredential.user.uid);
      }else if (usuarioRegistro.rol === "paciente"){
        paciente!.docRefUsuario = userDocRef;
        this._pacientesRepositoryService.create(paciente!, userCredential.user.uid);
      }

      await sendEmailVerification(userCredential.user)

      return {mensaje: "Usuario creado correctamente, por favor verifica el mail", valido:true}

    } catch (err) {
      console.log(err);
      let errorMensaje = "Hubo un error al intentar registrarte";
      if(err instanceof FirebaseError){
        if(err.code == 'auth/email-already-in-use'){
            errorMensaje = "El email ingresado ya existe, ingrese otro";
        }
      }
      return {mensaje: errorMensaje, valido:false};
    }
  }
  // metodo encargado de inicar sesion
  async login(usuarioLogin: any):Promise<{mensaje:string, valido:boolean}>{
    try{
      const userCredential = await signInWithEmailAndPassword(this.afAuth, usuarioLogin.email, usuarioLogin.password);

      if(!userCredential.user.emailVerified){
        throw new FirebaseError("auth/invalid-email-verified", "El mail no se encuentra verificado");
      }

      let usuario = this.listadoUsuariosModelo!.find(user => user.mail == usuarioLogin.email)!;

      if(!usuario){
        throw new FirebaseError("auth/error", "Su cuenta a sido eliminada.");
      }

      if(usuario.estado === "ingreso" && usuario.rol === "especialista"){
        throw new FirebaseError("auth/invalid-provider-data", "Especialista, debe esperar a ser admitido por el administrador");
      }

      this.setUserToLocalStorage(usuario);

      this._usuarioLogService.log(usuario.idUsuarioUid!,usuario.idUsuarioDocRef!);

      return {mensaje: "Usuario logueado correctamente", valido:true}

      //return true;
    }catch(err){
      console.log(err)
      let errorMensaje = "Hubo un error al intentar iniciar sesión, intenta más tarde";
      if(err instanceof FirebaseError){
        switch(err.code){
          case 'auth/user-not-found':
            errorMensaje = "El usuario ingresado no existe"
          break;
          case "auth/wrong-password":
            errorMensaje = "La contraseña ingresada no es válida"
          break;
          case "auth/too-many-requests":
            errorMensaje = "Has excedido el limite de intentos de inicio de sesión"
          break;
          case "auth/invalid-email-verified":
            errorMensaje = "Tu mail todavía no ha sido verificado, hazlo para poder ingresar a tu cuenta"
          break;
          case "auth/invalid-provider-data":
            errorMensaje = "Especialista, debe esperar a ser admitido por el administrador"
          break;
          case "auth/error":
            errorMensaje = "Su cuenta ha sido borrada por el administrador"
          break;
        }
      }
      return {mensaje: errorMensaje, valido:false};
    }
  }

  async userExist(mail:string): Promise<Boolean | undefined>{
    return this.listadoUsuariosModelo?.some(usr => usr.mail == mail);

  }

  // metodo encargado de actualizar los usuarios que se encuentran registrados en el local storage
  // si existe la key usuarios, limpia y aztualiza su contenido
  // si no existe la key, la crea con su contenido inicial
  refreshLocalStorage(data: Usuario[]){
    const userFromLocalStorage = localStorage.getItem('usuario');
    if(userFromLocalStorage == null){
       localStorage.setItem('usuario', JSON.stringify(data));
    }else{
      localStorage.clear();
      localStorage.setItem('usuario', JSON.stringify(data));
    }
  }

  // metodo utilizado para iniciar sesion
  setUserToLocalStorage(data: Usuario){
    const currentUserFromLocalStorage = localStorage.getItem('currentUser');
    let usrStringify = JSON.stringify(data);

    if(currentUserFromLocalStorage == null){
      localStorage.setItem('currentUser', usrStringify);
    }else{
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', usrStringify);
    }
  }

  //obtiene los datos del usuario que se encuentra con la sesion iniciada
  getCurrentUserLocalStorage():Usuario | null{
    const currentUserFromLocalStorage = localStorage.getItem('currentUser');
    if(currentUserFromLocalStorage != null){
      let usr = JSON.parse(currentUserFromLocalStorage);

      let usrToModel : Usuario = {
        idUsuarioDocRef:  usr.idUsuarioDocRef,
        idUsuarioUid: usr.idUsuarioUid,
        nombre: usr.nombre,
        apellido: usr.apellido,
        edad: usr.edad,
        dni: usr.dni,
        mail:usr.mail,
        password: usr.password,
        imagenPerfil1: usr.imagenPerfil1,
        estado: usr.estado,
        rol: usr.rol
      };

      return usrToModel;
    }
    return null;
  }

  // elimina el usuario que inicio sesion en el local storage
  deleteUserFromLocalStorage(): void{
    localStorage.removeItem('currentUser');
  }

  //verifica que el usuario haya inciaido sesion
  isLoggedIn(): boolean{
    return this.getCurrentUserLocalStorage() != null;
  }

  isLoggedInAndAdmin(): boolean{

    let response = this.getCurrentUserLocalStorage();

    if(!response){
      return false;
    }

    if(response.rol==="admin"){
      return true;
    }

    return false;
  }


}
