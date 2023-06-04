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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;

  isPatient: boolean = false;

  isDoctor: boolean = true;

  selectedSpecialties: string[] = [];

  specialities$: Observable<Especialidad[]> = new Observable<Especialidad[]>();

  specialities!: Especialidad[];

  susbscription?: Subscription;

  newSpeciality: string = '';

  typeOfPerson: string = '';

  selectedOptionKV!: string;

  selectedOption!: string;

  ngOnInit(): void {
    this.createForm();
    if (!this.susbscription) {
      this.susbscription = this._especialidadService
        .getAll()
        .subscribe((data) => {
          this.specialities = data;
        });
    }
  }

  ngOnDestroy(): void {
    this.susbscription?.unsubscribe();
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
      obraSocial: new FormControl(''),
      edad: new FormControl('', [Validators.min(0), Validators.max(80)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      confirmEmail: new FormControl('', [
        this.EmailValidator(),
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required]),
      profileImage1: new FormControl('', [Validators.required]),
      profileImage2: new FormControl(''),
      especialidad: new FormControl(''),
    });
  }

  // getters that references to formGroup elements
  get dni() {
    return this.registerForm.get('dni');
  }
  get obraSocial() {
    return this.registerForm.get('obraSocial');
  }
  get profileImage1() {
    return this.registerForm.get('profileImage1');
  }
  get profileImage2() {
    return this.registerForm.get('profileImage2');
  }
  get apellido() {
    return this.registerForm.get('apellido');
  }
  get especialidad() {
    return this.registerForm.get('especialidad');
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
      estado: 'ingreso',
      rol: this.isPatient ? 'paciente' : 'especialista',
    };

    let especialista: Especialista | undefined = undefined;

    let paciente: Paciente | undefined = undefined;

    if (user.rol === 'especialista') {
      especialista = {
        especialidad: this.selectedOptionKV,
        estado: 'ingreso',
      };
    } else {
      paciente = {
        obraSocial: $event.obraSocial,
        perfilImagen2: $event.profileImage2,
        estado: 'ingreso',
      };
    }

    let respuesta = this._usuarioService.register(user, especialista, paciente);

    respuesta.then((response) => {
      if (response.valido) {
        this.alertaMensajeSucces(response.mensaje);
        this._usuarioService.setUserToLocalStorage(user);
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

  addSepeciality() {
    ///TODO ARREGLAR
    for (let i = 0; i < this.specialities.length; i++) {
      if (this.specialities[i].nombre !== this.newSpeciality.trim()) {
        this.specialities.push({
          docRef: 'saasasd',
          nombre: this.newSpeciality,
        });
        this.newSpeciality = '';
        console.log('no existe');
      } else {
        continue;
      }
    }
  }

  onSelectionChange() {
    if (this.typeOfPerson === 'especialista') {
      this.isDoctor = true;
      this.isPatient = false;
    } else {
      this.isDoctor = false;
      this.isPatient = true;
    }
  }

  onOptionSelected() {

    let selectedOption = this.selectedOption.split(',');

    let elementToKeyValue = { key: selectedOption[1], value: selectedOption[0]}

    // //const currentValues = this.selectedOption.spl
    // const index = this.selectedOptionsArray.findIndex(
    //   (o) => o.key === elementToKeyValue.key
    // );

    // if (index > -1) {
    //   // Option already exists, remove it from the array
    //   this.selectedOptionsArray.splice(index, 1);
    // } else {
    //   // Option doesn't exist, add it to the array
    //   this.selectedOptionsArray.push(elementToKeyValue);
    // }

    this.selectedOptionKV = JSON.stringify(elementToKeyValue);

    console.log(this.selectedOptionKV);
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
