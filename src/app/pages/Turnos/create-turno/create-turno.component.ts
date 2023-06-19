import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Turno } from 'src/app/interfaces/Turno';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { UsuarioRepositoryService } from 'src/app/services/Usuario/usuario-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-create-turno',
  templateUrl: './create-turno.component.html',
  styleUrls: ['./create-turno.component.css']
})
export class CreateTurnoComponent implements OnInit, OnDestroy{
  isEspecialistasSelected: boolean = false;
  isEspecialidadSelected: boolean= false;
  listadoUsuarios!:Usuario[];
  listadoEspecialista!:Especialista[];
  usuarioSeleccionado!:Usuario;
  subscriptionUser!:Subscription;
  subscriptionEspecialsit!:Subscription;
  listaTurnosEspecialista!:Turno[];

  turnoForm!:FormGroup;

  constructor(private _usuarioService: UsuarioService, private _especialsitaRepository: EspecialistaRepositoryService,private _usuarioRepository:UsuarioRepositoryService){
    if(!this.turnoForm){
      this.createForm();
    }

  }
  get fechaTurno(){
    return this.turnoForm.get('fechaTurno');
  }

  ngOnInit(): void {
    // if(!this.subscriptionUser){
    //   this.subscriptionUser = this._usuarioRepository.getAll().subscribe(data => {
    //     this.listadoUsuarios = data;
    //   })
    // }
    // if(!this.subscriptionEspecialsit){
    //   this.subscriptionEspecialsit = this._especialsitaRepository.getAll().subscribe(data => {
    //     this.listadoEspecialista = data;
    //   })
    // }

  }

  ngOnDestroy(): void {
      this.subscriptionUser.unsubscribe();
      this.subscriptionEspecialsit.unsubscribe();
  }

  handleChange(option: string): void {
    if (option === 'especialistas') {
      this.isEspecialistasSelected = true;
      this.isEspecialidadSelected = false;
    } else if (option === 'especialidad') {
      this.isEspecialidadSelected = true;
      this.isEspecialistasSelected = false;
    }else{
      this.isEspecialidadSelected = false;
      this.isEspecialistasSelected = false;
    }
  }

  onSelectedUsuer(value:Usuario){
    console.log(value);
    this.usuarioSeleccionado = value;
  }

  createForm(){
    this.turnoForm = new FormGroup({
      fechaTurno: new FormControl('', [Validators.required])
    })

  }

  onSubmitEventHandler($event:Turno){
    // const turnoGenerar: Turno = {
    //   fechaTurno = $event.fechaTurno
    // }
  }


}
