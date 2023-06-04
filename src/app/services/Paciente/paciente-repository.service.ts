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
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Paciente } from 'src/app/interfaces/Paciente';


@Injectable({
  providedIn: 'root',
})
export class PacienteRepositoryService implements Repository<Paciente> {
  listadoPacientes!: CollectionReference<DocumentData>;

  listadoPacientes$!: Observable<Paciente[]>;

  constructor(private _firestore: Firestore) {
    this.listadoPacientes = collection(this._firestore, 'pacientes');
    this.listadoPacientes$ = collectionData(this.listadoPacientes) as Observable<
    Paciente[]
    >;
  }
  getAll(): Observable<Paciente[]> {
    return this.listadoPacientes$;
  }

  create(entity: Paciente, uid:string): string {
    if (this.listadoPacientes) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoPacientes);
      const newItem: any = {
        ...entity,
        docRefPaciente: docRef.id,
        idUsuarioUid: uid
      };

      setDoc(docRef, newItem);
      return docRef.id;
    }
    return "";
  }

  update(docRef: string, ...args: unknown[]): boolean {
    throw new Error('Method not implemented.');
  }
  delete(docRef: string): boolean {
    // el guid que genera el doc
    const documentReference = doc(this.listadoPacientes, "pacientes", docRef);

    if(!documentReference){
      deleteDoc(documentReference);
      return true;
    }
    return false;
  }
}
