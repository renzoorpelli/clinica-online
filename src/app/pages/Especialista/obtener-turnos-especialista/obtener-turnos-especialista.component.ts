import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-obtener-turnos-especialista',
  templateUrl: './obtener-turnos-especialista.component.html',
  styleUrls: ['./obtener-turnos-especialista.component.css']
})
export class ObtenerTurnosEspecialistaComponent implements OnInit{

  specialistFromLocalStorage!: Especialista;
  specialistUpdated!: Especialista;
  estadoSeleccionado!:number;
  shiftsList!:Turno[];


  constructor(private _especialistasRepository:EspecialistaRepositoryService, private _usuarioService:UsuarioService, private _pacineteService:PacienteRepositoryService, private _especialistaService:EspecialistaService){
  }

  ngOnInit(): void {
    this.specialistFromLocalStorage = this._usuarioService.getCurrentUserProfileLocalStorage();

  this._especialistasRepository
    .getSpecialistByDocRef(
      this.specialistFromLocalStorage.docRefEspecialista!
    )
    .then((data) => {
      this.specialistUpdated = data.data() as Especialista;
    });
    }

    onFilterShiftsByState(estado:EstadoTurno){
      return {...this.specialistUpdated.turnos?.filter(t => t.estado === estado)}
    }

    returnNameShiftState(number:number):string{
      return this._especialistaService.returnShiftNameByNumber(number);
    }

    getAll(){
      return this.specialistUpdated.turnos!;
    }

  }


//   getPacientsOfShifts(){
//     let pacientes: {key: string, value: Paciente}[] = [];

//     if(this._specialistFromFirebase){
//       this._specialistFromFirebase.turnos!.forEach(turno => {

//         // de los turnos tomados por un paciente, obtengo los datos del paciente.
//         if(turno.docRefPaciente){
//           let pacientQuerySnapshot = this._pacineteService.getPacienteByDocRef(turno.docRefPaciente!);

//           // por cada turno, la key sera el id del turno, y el valor, seran los datos del paciente.
//           pacientQuerySnapshot.then(data => {
//              // pacientes.push({key: turno.docRef, value:  data.data() as Paciente});
//           });

//         }
//       });
//     }
//     return pacientes;
//   }

// }



