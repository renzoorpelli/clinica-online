import { Injectable } from '@angular/core';
import { Repository } from 'src/app/Data/common-repository.interface';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Especialista } from 'src/app/interfaces/Especialista';
import { EspecialistaRepositoryService } from './especialista-repository.service';
import { Especialidad } from 'src/app/interfaces/Especialidad';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';
import { TurnoRepositoryService } from '../Turno/turno-repository.service';

@Injectable({
  providedIn: 'root',
})
export class EspecialistaService  {

  constructor(private _especialistaRepository:EspecialistaRepositoryService, private _turnoRepository:TurnoRepositoryService){
  }

  // asigna la especialidad formalmente, con los dias y horario que la atendera
  asignarEspecialidadEspecialista(especialidad:Especialidad, idDocRefEspecialista:string){
    if(!especialidad){
      return;
    }
    this._especialistaRepository.updateSpecialityAttribute(idDocRefEspecialista, especialidad);
  }

  asignarTurnoEspecialista(turno:Turno, docRefEspecialista:string){
    if(!turno){
      return;
    }
    let response = this._turnoRepository.create(turno, "null");
    turno.idTurnoDocRef = response;
    this._especialistaRepository.updateShiftAttriubte(turno,docRefEspecialista);
  }

  returnShiftNameByNumber(number:number):string{
    switch (number) {
      case EstadoTurno.Libre:
        return 'Libre';
      case EstadoTurno.Pendiente:
        return 'Pendiente';
      case EstadoTurno.Aceptado:
        return 'Aceptado';
      case EstadoTurno.Rechazado:
        return 'Rechazado';
      case EstadoTurno.Cancelado:
        return 'Cancelado';
      case EstadoTurno.Realizado:
        return 'Realizado';
      default:
        return 'Desconocido';
    }
  }

  returnShiftTypeByNum(number:number):string{
    return number === 0 ? "Consulta" : "Tratamiento";
  }

}
