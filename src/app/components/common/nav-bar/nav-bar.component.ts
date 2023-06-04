import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-nav-bar',
  styleUrls: ['./nav-bar.component.css'],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent{
  constructor(private _usuarioService:UsuarioService){}


  isLoggedInAndAdmin():boolean{
    return this._usuarioService.isLoggedInAndAdmin();
  }
}
