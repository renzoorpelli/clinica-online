import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { TurnoService } from 'src/app/services/Turno/turno.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-obtener-turnos-especialista',
  templateUrl: './obtener-turnos-especialista.component.html',
  styleUrls: ['./obtener-turnos-especialista.component.css'],
})
export class ObtenerTurnosEspecialistaComponent implements OnInit {
  specialistFromLocalStorage!: Especialista;
  specialistUpdated!: Especialista;
  fechaSeleccionada!: string;
  shiftsList!: Turno[];
  resenia: string = '';
  displayInput: boolean = false;
  selectedShift?: Turno;

  constructor(
    private _especialistasRepository: EspecialistaRepositoryService,
    private _usuarioService: UsuarioService,
    private _pacineteService: PacienteRepositoryService,
    private _especialistaService: EspecialistaService,
    private _turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    this.specialistFromLocalStorage =
      this._usuarioService.getCurrentUserProfileLocalStorage();

    this._especialistasRepository
      .getSpecialistByDocRef(
        this.specialistFromLocalStorage.docRefEspecialista!
      )
      .then((data) => {
        this.specialistUpdated = data.data() as Especialista;
      });
  }

  returnNameShiftState(number: number): string {
    return this._especialistaService.returnShiftNameByNumber(number);
  }

  getAll() {
    return this.specialistUpdated.turnos!;
  }

  onConfirmShift(shift: Turno) {
    this._turnoService.confirmShiftBySpecialist(shift);
    this.alertMensjae('Se realizó la operación con éxito', 'TURNO CONFIRMADO');
  }

  onRefuseShift(shift: Turno) {
    this.selectedShift = shift;
    this.displayInput = !this.displayInput;
  }
  onConfirmCancelShift(shift: Turno) {
    const shiftToCancel: Turno = {
      docRefEspecialista: shift.docRefEspecialista,
      docRefPaciente: shift.docRefPaciente,
      especialidad: shift.especialidad,
      estado: shift.estado,
      fechaTurno: shift.fechaTurno,
      idTurnoDocRef: shift.idTurnoDocRef,
      tipo: shift.tipo,
      resenia: this.resenia,
    };

    this._turnoService.refuseShiftBySpecialist(shiftToCancel);
    this.displayInput = false;
    this.selectedShift = undefined;
    this.resenia = '';
    this.alertMensjae('Se realizó la operación con éxito', 'TURNO RECHAZADO');
  }

  onRealiceShift(shift: Turno) {
    this._turnoService.realiceShiftBySpecialist(shift);
    this.alertMensjae('Se atendió al paciente con éxito', 'TURNO REALIZADO');
  }

  onReviewShift(shift: Turno) {}

  alertMensjae(mensaje: string, title: string): void {
    Swal.fire({
      title: title,
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  getDatesOfShifts(): string[] | undefined {
    if (!this.specialistUpdated.turnos) {
      return undefined;
  }

  let dates = this.specialistUpdated.turnos.map(t => {
      let date = new Date(t.fechaTurno!);
      return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
  });

  let uniqueDates = Array.from(new Set(dates));
  return uniqueDates;
  }

  onFilterDateChange(fechaSeleccionada: string) {}
}
