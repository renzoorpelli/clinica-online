import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import { HistoriaClinicaPacienteComponent } from 'src/app/components/Especialista/historia-clinica-paciente/historia-clinica-paciente.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObtenerhistoriaClinicaPacienteComponent } from 'src/app/components/Especialista/obtenerhistoria-clinica-paciente/obtenerhistoria-clinica-paciente.component';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit, OnDestroy {
  specialistUpdated!: Especialista;
  specialistFromLocalStorage!: Especialista;
  private _subscription?:Subscription;
  _pacientList!: Paciente[];

  constructor(
    private _usuarioService: UsuarioService,
    private _especialistRepository: EspecialistaRepositoryService,
    private _pacientSerice: PacienteRepositoryService,
    private _modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.specialistFromLocalStorage =
      this._usuarioService.getCurrentUserProfileLocalStorage();

    if(!this._subscription){
      this._especialistRepository
      .getSpecialistByDocRefObservable(this.specialistFromLocalStorage.docRefEspecialista!)
      .subscribe(data => {
        this.specialistUpdated = data.data() as Especialista;

        const docRefFinishedShift = this.specialistUpdated.turnos!
        .filter((s) => s.estado === 5)
        .map((s) => s.docRefPaciente);

        this._pacientSerice.getAll().pipe(
          map(list => list.filter(p => docRefFinishedShift.includes(p.docRefPaciente)))
          ).subscribe((data) => {
            this._pacientList = data;
          });
      })
    }
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  openGenerateClinicHistory(pacient: Paciente) {
    const modalRef = this._modalService.open(HistoriaClinicaPacienteComponent, {
      centered: true,
    });

    modalRef.componentInstance.pacientFromComponent = pacient;

    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openViewClinicHistory(clinicHistory: any) {
    const modalRef = this._modalService.open(
      ObtenerhistoriaClinicaPacienteComponent,
      { centered: true }
    );

    modalRef.componentInstance.data = clinicHistory;

    modalRef.result
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
