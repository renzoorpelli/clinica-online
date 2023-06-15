import { Component, OnDestroy, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Turno } from 'src/app/interfaces/Turno';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-obtener-turnos-paciente',
  templateUrl: './obtener-turnos-paciente.component.html',
  styleUrls: ['./obtener-turnos-paciente.component.css'],
})
export class ObtenerTurnosPacienteComponent implements OnInit, OnDestroy {
  userFromLocalStorage!: Paciente | null;
  paciente!: Paciente;
  pacientUpdated!: Paciente;
  estadoSeleccionado!: number;
  shiftsList!: Turno[];

  constructor(private _usuarioService: UsuarioService, private pacientRepository:PacienteRepositoryService, private especialistService:EspecialistaService) {

  }

  ngOnInit(): void {
    this.userFromLocalStorage =
    this._usuarioService.getCurrentUserProfileLocalStorage();

    this.pacientRepository
      .getPacienteByDocRef(
        this.userFromLocalStorage!.docRefPaciente!
      )
      .then((data) => {
        this.pacientUpdated = data.data() as Paciente;
      });
  }

  returnNameShiftState(number:number):string{
    return this.especialistService.returnShiftNameByNumber(number);
  }

  returnNameOfTypeShift(number:number):string{
    return this.especialistService.returnShiftTypeByNum(number);
  }

  getAll(){
    return this.pacientUpdated.turnos!;
  }
  ngOnDestroy(): void {
    this.userFromLocalStorage = null;
  }
}
