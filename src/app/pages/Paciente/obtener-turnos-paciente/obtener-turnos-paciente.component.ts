import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Turno } from 'src/app/interfaces/Turno';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PDFService } from 'src/app/services/File/pdf.service';
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
  specialist?:string;
  selectedSpecialist?:Especialista;
  specialists?:Especialista[];
  subscription?:Subscription;
  docRefsSpecialist?:string[];

  constructor(private _usuarioService: UsuarioService, private pacientRepository:PacienteRepositoryService, private especialistService:EspecialistaService, private _turnoService:TurnoService, private _pdfService:PDFService) {

  }

  ngOnInit(): void {
    this.userFromLocalStorage =
    this._usuarioService.getCurrentUserProfileLocalStorage();

    if(!this.subscription){
      this.pacientRepository
      .getPacienteByDocRefObservable(
        this.userFromLocalStorage!.docRefPaciente!
      )
      .subscribe((data) => {
        this.pacientUpdated = data.data() as Paciente;

        this.docRefsSpecialist = [...new Set(this.pacientUpdated.turnos?.map(t => t.docRefEspecialista!))];

        this.subscription = this.especialistService.getSelectedSpecialist(this.docRefsSpecialist!).subscribe(data => {
          this.specialists = data;
        })
      });
    }
  }

  returnNameShiftState(number:number):string{
    return this.especialistService.returnShiftNameByNumber(number);
  }

  returnNameOfTypeShift(number:number):string{
    return this.especialistService.returnShiftTypeByNum(number);
  }

  ngOnDestroy(): void {
    this.userFromLocalStorage = null;
    this.subscription!.unsubscribe();
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

   onFilterSpecialistChange(){
      this.selectedSpecialist = this.specialists?.filter(sp => sp.docRefEspecialista === this.specialist)[0];
   }

   onClearFilter(){
    this.selectedSpecialist = undefined;
   }

   onExportToPdf(){
    let element = document.getElementsByTagName('table')[0]!;
    this._pdfService.generatePDF(element, `Historial turnos con: DR.  ${this.selectedSpecialist?.nombre} ${this.selectedSpecialist?.apellido}`)
   }
}
