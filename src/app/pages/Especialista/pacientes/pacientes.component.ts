import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Turno } from 'src/app/interfaces/Turno';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { TurnoService } from 'src/app/services/Turno/turno.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import { HistoriaClinicaPacienteComponent } from 'src/app/components/Especialista/historia-clinica-paciente/historia-clinica-paciente.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObtenerhistoriaClinicaPacienteComponent } from 'src/app/components/Especialista/obtenerhistoria-clinica-paciente/obtenerhistoria-clinica-paciente.component';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  specialistUpdated!: Especialista;
  specialistFromLocalStorage!: Especialista;
  pacientShiftRealized!: Turno[];
  pacientFiltered!: Paciente[];
  formHistoriaClinica!: FormGroup;

  constructor(
    private _usuarioService: UsuarioService,
    private _especialistRepository: EspecialistaRepositoryService,
    private _specialisService: EspecialistaService,
    private _pacientSerice: PacienteRepositoryService,
    private _modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.specialistFromLocalStorage =
      this._usuarioService.getCurrentUserProfileLocalStorage();

    this._especialistRepository
      .getSpecialistByDocRef(
        this.specialistFromLocalStorage.docRefEspecialista!
      )
      .then((data) => {
        this.specialistUpdated = data.data() as Especialista;
      });

    this._pacientSerice.getAll().subscribe((data) => {
      this.pacientFiltered = this._specialisService.getPacientsFromFinishShifts(
        this.specialistUpdated.turnos!,
        data
      );
    });
  }


  openGenerateClinicHistory(pacient:Paciente){
    const modalRef = this._modalService.open(HistoriaClinicaPacienteComponent, {centered: true});

    modalRef.componentInstance.pacientFromComponent = pacient;

    modalRef.result.then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err);
    })
  }

  openViewClinicHistory(clinicHistory:any){
    const modalRef = this._modalService.open(ObtenerhistoriaClinicaPacienteComponent, {centered: true});

    modalRef.componentInstance.data = clinicHistory;

    modalRef.result.then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err);
    })
  }
}
