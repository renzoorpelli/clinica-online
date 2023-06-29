import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, map } from 'rxjs';
import { ShiftsPacientComponent } from 'src/app/components/Administrador/shifts-pacient/shifts-pacient.component';
import { ShiftsOfMyPacientsComponent } from 'src/app/components/Especialista/shifts-of-my-pacients/shifts-of-my-pacients.component';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit, OnDestroy {

  specialistUpdated!: Especialista;
  specialistFromLocalStorage!: Especialista;
  private _subscription?:Subscription;
  _pacientList!: Paciente[];
  constructor(
    private _usuarioService: UsuarioService,
    private _especialistRepository: EspecialistaRepositoryService,
    private _pacientSerice: PacienteRepositoryService,
    private _modalService: NgbModal
  ){}

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

  onReviewShiftPacient(pacient:Paciente){
    const modalRef = this._modalService.open(ShiftsOfMyPacientsComponent, {size: 'xl'});

    modalRef.componentInstance.data = pacient;

    modalRef.result.then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err);
    })
  }

}
