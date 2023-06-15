import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioRepositoryService } from 'src/app/services/Usuario/usuario-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm!:FormGroup;
  private _subscription!: Subscription;
  listadoUsuarios!:Usuario[];
  admin!:Usuario;
  listadoPaciente!:Usuario[];
  listadoEspecialista!:Usuario[];


  ngOnInit(): void {
    if(!this._subscription){
      this._subscription = this.usuarioRepositoryService.getAll().subscribe(data => {
        this.listadoUsuarios = data;

        this.admin = this.listadoUsuarios.filter(usr => usr.rol === "admin")[0];
        this.listadoPaciente = this.listadoUsuarios.filter(usr => usr.rol === "paciente");
        this.listadoEspecialista =this.listadoUsuarios.filter(usr => usr.rol === "especialista")
      })
    }
      this.createForm();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  constructor(private _usuarioService:UsuarioService, private _router: Router, private usuarioRepositoryService:UsuarioRepositoryService){}

  createForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  // getters that references to a formGroup Elements
  get mail(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmitEventHandler($event:any){
    let respuesta = this._usuarioService.login($event);
    respuesta.then(response => {
      if(response.valido){
        this.alertaMensajeSucces(response.mensaje)
        this._router.navigate(['home']);
      }else{
        this.alertaMensajeError(response.mensaje)
      }
    });
  }

  alertaMensajeSucces(mensaje:string):void{
    Swal.fire(
      {
        title: 'Sucess!',
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonAriaLabel: '<a routerLink="usuario/login"></a>'}
    )
   }

   alertaMensajeError(mensaje:string):void{
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'}
    )
   }

   InsertCredentials(user:Usuario){
    this.mail?.setValue(user.mail)
    this.password?.setValue(user.password)
   }
}
