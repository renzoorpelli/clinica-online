import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/interfaces/Especialista';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-obtener-agenda',
  templateUrl: './obtener-agenda.component.html',
  styleUrls: ['./obtener-agenda.component.css']
})
export class ObtenerAgendaComponent implements OnInit{

  currentUserFromLocalStorage: Especialista;
  selectedSpecialist!:Especialista;
  subscription!:Subscription;
  constructor(private _especialistaRepService:EspecialistaRepositoryService, private _usuarioService: UsuarioService){
    this.currentUserFromLocalStorage = this._usuarioService.getCurrentUserProfileLocalStorage();
  }

  ngOnInit(): void {
    if(!this.subscription){
      this.subscription = this._especialistaRepService.getAll().subscribe(data => {
         this.selectedSpecialist = data.filter(e => e.docRefEspecialista === this.currentUserFromLocalStorage.docRefEspecialista!)[0];
      })
    }
  }

}
