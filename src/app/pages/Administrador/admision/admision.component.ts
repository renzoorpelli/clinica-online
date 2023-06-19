import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { UsuarioRepositoryService } from 'src/app/services/Usuario/usuario-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit, OnDestroy{

  listadoUsuario!:Usuario[];

  subscription!:Subscription;
  constructor(private _usuarioRepositoryService:UsuarioRepositoryService,
    private _usuarioService:UsuarioService,
    private _especialistaRepositoryService:EspecialistaRepositoryService,
    private _pacienteRepositoryService:PacienteRepositoryService){}

  ngOnInit(): void {
    if(!this.subscription){
      this.subscription = this._usuarioRepositoryService.getAll().subscribe(data => {
        this.listadoUsuario = data;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  allowUser(item:Usuario){
    this._usuarioRepositoryService.update(item.idUsuarioDocRef!, "admitido");
  }

  denyAccess(item:Usuario){

    if(item.rol === "especialista"){
      let docRefEspecialistaPromise = this._especialistaRepositoryService.getEspecialistaByDocRefUsuario(item.idUsuarioDocRef!).then((data) =>
      {
        this._especialistaRepositoryService.delete(data!);
      });


    }else{
      return;
    }
    this._usuarioRepositoryService.delete(item.idUsuarioDocRef!);

  }

}
