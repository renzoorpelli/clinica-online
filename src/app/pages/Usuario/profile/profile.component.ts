import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userFromLocalStorage?:Usuario | null;
  userProfileLocalStorage?:any;
  ngOnInit(): void {
    this.userFromLocalStorage = this._userService.getCurrentUserLocalStorage();
    this.userProfileLocalStorage = this._userService.getCurrentUserProfileLocalStorage();
  }

  constructor(private _userService: UsuarioService, private _router: Router){}

  logOut(){
    this.userFromLocalStorage = undefined;
    this._userService.deleteUserFromLocalStorage();
    this._router.navigate(['usuario/login'])
  }


}
