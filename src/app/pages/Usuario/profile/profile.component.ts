import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userFromLocalStorage?:Usuario | null;
  ngOnInit(): void {
    this.userFromLocalStorage = this._userService.getCurrentUserLocalStorage();
  }

  constructor(private _userService: UsuarioService, private _router: Router){}

  logOut(){
    this.userFromLocalStorage = undefined;
    this._userService.deleteUserFromLocalStorage();
    this._router.navigate(['usuario/login'])
  }


}
