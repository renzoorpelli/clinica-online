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
import { Turno } from 'src/app/interfaces/Turno';

@Injectable({
  providedIn: 'root',
})
export class TurnoRepositoryService implements Repository<Turno> {
  listadoTurnos!: CollectionReference<DocumentData>;
  listadoTurnos$!: Observable<Turno[]>;

  constructor(private _firestore: Firestore) {
    this.listadoTurnos = collection(this._firestore, 'turnos');
    this.listadoTurnos$ = collectionData(this.listadoTurnos) as Observable<
      Turno[]
    >;
  }
  getAll(): Observable<Turno[]> {
    return this.listadoTurnos$;
  }

  create(entity: Turno, uid: string): string {
    try {
      if (!this.listadoTurnos) {
        return '';
      }
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoTurnos);
      const newItem: any = {
        ...entity,
        idTurnoDocRef: docRef.id,
      };

      setDoc(docRef, newItem);
      return docRef.id;
    } catch (e) {
      console.log(e);
      return 'no';
    }
  }

  updateStatusOfShift(docRefShift: string, modifiedShift: Turno) {
    try {
      const documentReference = doc(this.listadoTurnos, docRefShift);

      updateDoc(documentReference, {
        docRefEspecialista: modifiedShift.docRefEspecialista,
        especialidad: modifiedShift.especialidad,
        estado: modifiedShift.estado,
        fechaTurno: modifiedShift.fechaTurno,
        docRefPaciente: modifiedShift.docRefEspecialista,
        tipo: modifiedShift.tipo
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  update(docRef: string, ...args: unknown[]): boolean {
    throw new Error('Method not implemented.');
  }
  delete(docRef: string): boolean {
    // el guid que genera el doc
    const documentReference = doc(this.listadoTurnos, docRef);

    if (!documentReference) {
      deleteDoc(documentReference);
      return true;
    }
    return false;
  }

  async getTurnoByDocRef(turnoDocRef: string): Promise<DocumentSnapshot> {
    const documentReference = doc(this.listadoTurnos, turnoDocRef);
    return await getDoc(documentReference);
  }

  updateTurno(turno: Turno, docRefShift: string) {
    try {
      const documentReference = doc(this.listadoTurnos, docRefShift);
      updateDoc(documentReference, { turno });
    } catch (e) {
      console.log(e);
    }
    return false;
  }
}
