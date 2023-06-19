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
      shiftModified.resenia = "";
      this.pacienteRepository.updateShiftAttriubte(shiftModified, docRefPacient);
      this.especialistaRepository.updateStatusOfShift(shiftModified.docRefEspecialista!, shiftModified.idTurnoDocRef!, shiftModified);
      this.turnoRepository.updateStatusOfShift(shiftModified.idTurnoDocRef!, shiftModified);

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  }


  cancelShiftPacient(shiftModified:Turno ,docRefPacient:string):boolean{
    try {

      // EL TURNO PARA EL ESPECIALISTA TIENE QUE VOLVER A SER DISPONIBLE, quedar como el original
      const turnoEspecialista: Turno = {
        idTurnoDocRef : shiftModified.idTurnoDocRef,
        docRefEspecialista: shiftModified.docRefEspecialista,
        estado : 0,
        especialidad: shiftModified.especialidad,
        fechaTurno: shiftModified.fechaTurno,
      }

      // EL TURNO PARA EL PACIENTE MOSTRANDO EL PORQUE LO CANCELO
      const turnoPaciente:Turno = {
        idTurnoDocRef : shiftModified.idTurnoDocRef,
        estado : 4,
        especialidad: shiftModified.especialidad,
        fechaTurno: shiftModified.fechaTurno,
        tipo: shiftModified.tipo,
        docRefPaciente: shiftModified.docRefPaciente,
        docRefEspecialista:shiftModified.docRefEspecialista,
        resenia: shiftModified.resenia ? shiftModified.resenia : ""
      }

      this.especialistaRepository.updateStatusOfShift(turnoEspecialista.docRefEspecialista!, turnoEspecialista.idTurnoDocRef!, turnoEspecialista);

      this.pacienteRepository.updateShiftStatusPacient(turnoPaciente, docRefPacient);

      this.turnoRepository.updateStatusOfShift(turnoPaciente.idTurnoDocRef!, turnoPaciente);



      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  }


  refuseShiftBySpecialist(shiftModified:Turno){

    try {
      // EL TURNO PARA EL ESPECIALISTA TIENE QUE VOLVER A SER DISPONIBLE, quedar como el original
    const turnoEspecialista: Turno = {
      idTurnoDocRef : shiftModified.idTurnoDocRef,
      docRefEspecialista: shiftModified.docRefEspecialista,
      estado : 0,
      especialidad: shiftModified.especialidad,
      fechaTurno: shiftModified.fechaTurno,
    }

     // EL TURNO PARA EL PACIENTE MOSTRANDO EL PORQUE LO CANCELO
     const turnoPaciente:Turno = {
      idTurnoDocRef : shiftModified.idTurnoDocRef,
      estado : 3,
      especialidad: shiftModified.especialidad,
      fechaTurno: shiftModified.fechaTurno,
      tipo: shiftModified.tipo,
      docRefPaciente: shiftModified.docRefPaciente,
      docRefEspecialista:shiftModified.docRefEspecialista,
      resenia: shiftModified.resenia ? shiftModified.resenia : ""
    }


    this.especialistaRepository.updateStatusOfShift(turnoEspecialista.docRefEspecialista!, turnoEspecialista.idTurnoDocRef!, turnoEspecialista);

    this.pacienteRepository.updateShiftStatusPacient(turnoPaciente, shiftModified.docRefPaciente!);

    this.turnoRepository.updateStatusOfShift(turnoPaciente.idTurnoDocRef!, turnoPaciente);

    } catch (error) {
      console.log(error);
    }
  }

  confirmShiftBySpecialist(shiftModified:Turno){
    try {
     // EN ESTE  CASO LOS DATOS DEL TURNO SON IGUALES, YA QYE FUE ACEPTADO Y TIENE QUE QUEDAR OCUPADO
     const turno:Turno = {
      idTurnoDocRef : shiftModified.idTurnoDocRef,
      estado : 2,
      especialidad: shiftModified.especialidad,
      fechaTurno: shiftModified.fechaTurno,
      tipo: shiftModified.tipo,
      docRefPaciente: shiftModified.docRefPaciente,
      docRefEspecialista:shiftModified.docRefEspecialista,
      resenia: shiftModified.resenia ? shiftModified.resenia : ""
    }


    this.especialistaRepository.updateStatusOfShift(turno.docRefEspecialista!, turno.idTurnoDocRef!, turno);

    this.pacienteRepository.updateShiftStatusPacient(turno, shiftModified.docRefPaciente!);

    this.turnoRepository.updateStatusOfShift(turno.idTurnoDocRef!, turno);

    } catch (error) {
      console.log(error);
    }
  }

  realiceShiftBySpecialist(shiftModified:Turno){
    try {
      // EN ESTE  CASO LOS DATOS DEL TURNO SON IGUALES, YA QYE FUE ACEPTADO Y TIENE QUE QUEDAR OCUPADO
      const turno:Turno = {
       idTurnoDocRef : shiftModified.idTurnoDocRef,
       estado : 5,
       especialidad: shiftModified.especialidad,
       fechaTurno: shiftModified.fechaTurno,
       tipo: shiftModified.tipo,
       docRefPaciente: shiftModified.docRefPaciente,
       docRefEspecialista:shiftModified.docRefEspecialista,
       resenia: shiftModified.resenia ? shiftModified.resenia : ""
     }


     this.especialistaRepository.updateStatusOfShift(turno.docRefEspecialista!, turno.idTurnoDocRef!, turno);

     this.pacienteRepository.updateShiftStatusPacient(turno, shiftModified.docRefPaciente!);

     this.turnoRepository.updateStatusOfShift(turno.idTurnoDocRef!, turno);

     } catch (error) {
       console.log(error);
     }


  }

}
