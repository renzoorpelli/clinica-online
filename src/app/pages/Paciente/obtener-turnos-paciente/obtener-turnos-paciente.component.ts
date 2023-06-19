import { Component, OnDestroy, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Turno } from 'src/app/interfaces/Turno';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { TurnoService } from 'src/app/services/Turno/turno.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import Swal from 'sweetalert2';

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
  resenia:string = "";
  displayInput:boolean = false;
  selectedShift?:Turno;

  constructor(private _usuarioService: UsuarioService, private pacientRepository:PacienteRepositoryService, private especialistService:EspecialistaService, private _turnoService:TurnoService) {

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

  onCancelShift(shift:Turno){
    console.log(shift.idTurnoDocRef);
    this.selectedShift = shift;
    this.displayInput = !this.displayInput;
  }

  onConfirmCancelShift(shift:Turno){
    const shiftToCancel: Turno= {
      docRefEspecialista: shift.docRefEspecialista,
      docRefPaciente:shift.docRefPaciente,
      especialidad:shift.especialidad,
      estado: shift.estado,
      fechaTurno:shift.fechaTurno,
      idTurnoDocRef:shift.idTurnoDocRef,
      tipo:shift.tipo,
      resenia: this.resenia
    }

    this._turnoService.cancelShiftPacient(shiftToCancel, this.pacientUpdated.docRefPaciente!);
    this.displayInput = false;
    this.selectedShift = undefined;
    this.resenia = "";
  }

  onReviewShift(shift:Turno){
    this.alertMensjae(shift.resenia!);
  }

  alertMensjae(mensaje:string):void{
    Swal.fire({
      title: 'Razón de inasistencia',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'}
    )
   }
}
