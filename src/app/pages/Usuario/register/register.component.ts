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
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { ProfileImageService } from 'src/app/services/File/profile-image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;

  isPatient: boolean = false;

  isDoctor: boolean = true;

  isSelected:boolean = false;

  selectedSpecialties: string[] = [];

  susbscription?: Subscription;

  newSpeciality: string = '';
  selectedOptionKV!: string[];

  selectedOption!: string;

  captchaValid:boolean = false;

  resultOfCaptchaFromUser!:number;

  images:any[] = [];

   num1 = Math.floor(Math.random() * 10);
   num2 = Math.floor(Math.random() * 10);
   result = this.num1 +this.num2;

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.susbscription?.unsubscribe();
  }

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
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
      estado: this.isPatient ? 'admitido' : 'ingreso',
      rol: this.isPatient ? 'paciente' : 'especialista',
    };

    let especialista: Especialista | undefined = undefined;

    let paciente: Paciente | undefined = undefined;

    if (user.rol === 'especialista') {
      especialista = {
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        dni: user.dni,
        mail: user.mail,
        password:user.password,
        especialidad: this.selectedSpecialties,
      };
    } else {
      paciente = {
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        dni: user.dni,
        mail: user.mail,
        password:user.password,
        obraSocial: $event.obraSocial,
        estado: 'admitido',
      };
    }

    let respuesta = this._usuarioService.register(user, especialista, paciente, this.images);

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

  onSelectionChange(value:string) {
    this.isSelected = true;
    if (value === 'especialista') {
      this.isDoctor = true;
      this.isPatient = false;
    } else {
      this.isDoctor = false;
      this.isPatient = true;
    }
  }

  onOptionSelected() {
    let selectedOption = this.selectedOption.split(',');
    this.selectedOptionKV = selectedOption;
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


  addSpeciality(){
    if(this.newSpeciality && !this.selectedSpecialties.includes(this.newSpeciality)){
      this.selectedSpecialties.push(this.newSpeciality);
    }
  }

  deleteSpeciality(value:string){
      this.selectedSpecialties.splice(this.selectedSpecialties.indexOf(value), 1);
      console.log(this.selectedSpecialties);
  }

  validateCaptcha() {
    const expectedCaptchaResult = this.result;
    console.log(this.result)
    console.log(this.resultOfCaptchaFromUser)
    if (Number(this.resultOfCaptchaFromUser) === expectedCaptchaResult) {
      this.captchaValid = true;
      console.log("entro");
    } else {
      this.captchaValid = false;
      console.log("entro no");
    }
  }

  uploadImage($event: any) {
    const files = Array.from($event.target.files);
    this.images.push(...files);
    console.log(this.images)
  }
}
