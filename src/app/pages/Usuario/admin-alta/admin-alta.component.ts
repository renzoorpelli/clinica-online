import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialidadRepositoryService } from 'src/app/services/Especialidad/especialidad-repository.service';
import { Especialidad } from 'src/app/interfaces/Especialidad';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';

@Component({
  selector: 'app-admin-alta',
  templateUrl: './admin-alta.component.html',
  styleUrls: ['./admin-alta.component.css'],
})
export class AdminAltaComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;

  isPatient: boolean = false;

  isDoctor: boolean = true;

  selectedSpecialties: string[] = [];


  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {

  }

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _especialidadService: EspecialidadRepositoryService
  ) {}

  createForm() {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(80),
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      edad: new FormControl('', [Validators.min(0), Validators.max(80)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      confirmEmail: new FormControl('', [
        this.EmailValidator(),
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required]),
      profileImage1: new FormControl('', [Validators.required]),
    });
  }

  // getters that references to formGroup elements
  get dni() {
    return this.registerForm.get('dni');
  }
  get profileImage1() {
    return this.registerForm.get('profileImage1');
  }
  get apellido() {
    return this.registerForm.get('apellido');
  }
  get nombre() {
    return this.registerForm.get('nombre');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get edad() {
    return this.registerForm.get('edad');
  }

  get confirmEmail() {
    return this.registerForm.get('confirmEmail');
  }

  get password() {
    return this.registerForm.get('password');
  }

  //metodo encargado de manejar el evento submit que recibe del formsModule
  onSubmitEventHandler($event: any) {
    const user: Usuario = {
      nombre: $event.nombre,
      apellido: $event.apellido,
      edad: $event.edad,
      dni: $event.dni,
      mail: $event.email,
      password: $event.password,
      imagenPerfil1: $event.profileImage1,
      estado: 'admitido',
      rol: "admin",
    };

    let respuesta = this._usuarioService.register(user);

    respuesta.then((response) => {
      if (response.valido) {
        this.alertaMensajeSucces(response.mensaje);
        this._router.navigate(['usuario/login']);
      } else {
        this.alertaMensajeError(response.mensaje);
      }
    });
  }

  // metodo encargado de verficar que el mail con el que se intenta registrar el usuario sea igual
  //
  EmailValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      return formGroup.get('email')?.value ===
        formGroup.get('confirmEmail')?.value
        ? null
        : { notEqual: true };
    };
  }

  alertaMensajeSucces(mensaje: string): void {
    Swal.fire({
      title: 'Sucess!',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar', //,
      //confirmButtonAriaLabel: '<a routerLink="usuario/login"></a>',
    });
  }

  alertaMensajeError(mensaje: string): void {
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
}
