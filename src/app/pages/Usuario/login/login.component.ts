import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;

  ngOnInit(): void {
      this.createForm();
  }

  constructor(private _usuarioService:UsuarioService, private _router: Router){}

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

}
