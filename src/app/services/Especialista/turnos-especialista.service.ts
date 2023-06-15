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
import { Especialidad } from 'src/app/interfaces/Especialidad';
import { UsuarioService } from '../Usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class TurnosEspecialistaService {
  constructor(private _usuarioService: UsuarioService) {}

  obtenerNumerosDias(dia: string): Date[] {
    const fechasDias: Date[] = [];
    const fechaActual = new Date();

    for (let i = 0; i < 15; i++) {
      const fecha = new Date();
      fecha.setDate(fechaActual.getDate() + i);

      if (this.obtenerNombreDia(fecha.getDay()) === dia) {
        fechasDias.push(fecha);
      }
    }

    return fechasDias;
  }

  obtenerNombreDia(numeroDia: number): string {
    const nombresDias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    return nombresDias[numeroDia];
  }
}
