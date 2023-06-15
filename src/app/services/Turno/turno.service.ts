import { Injectable } from '@angular/core';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';
import { TurnoRepositoryService } from '../Turno/turno-repository.service';
import { PacienteRepositoryService } from '../Paciente/paciente-repository.service';
import { EspecialistaRepositoryService } from '../Especialista/especialista-repository.service';

@Injectable({
  providedIn: 'root',
})
export class TurnoService  {

  constructor(private pacienteRepository:PacienteRepositoryService, private especialistaRepository:EspecialistaRepositoryService, private turnoRepository:TurnoRepositoryService){}


  setShiftToPacient(shiftModified:Turno, docRefPacient:string):boolean{
    try {
      this.pacienteRepository.updateShiftAttriubte(shiftModified, docRefPacient);
      this.especialistaRepository.updateStatusOfShift(shiftModified.docRefEspecialista!, shiftModified.idTurnoDocRef!, shiftModified);
      this.turnoRepository.updateStatusOfShift(shiftModified.idTurnoDocRef!, shiftModified);

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
