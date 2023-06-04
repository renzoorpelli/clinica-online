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
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Especialidad } from 'src/app/interfaces/Especialidad';


@Injectable({
  providedIn: 'root',
})
export class EspecialidadRepositoryService implements Repository<Especialidad> {
  listadoEspecialidades!: CollectionReference<DocumentData>;

  listadoEspecialidades$!: Observable<Especialidad[]>;

  constructor(private _firestore: Firestore) {
    this.listadoEspecialidades = collection(this._firestore, 'especialidad');
    this.listadoEspecialidades$ = collectionData(this.listadoEspecialidades) as Observable<
      Especialidad[]
    >;
  }
  getAll(): Observable<Especialidad[]> {
    return this.listadoEspecialidades$;
  }

  create(entity: Especialidad, uid:string): string {
    if (this.listadoEspecialidades) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoEspecialidades);
      const newItem: Especialidad = {
        docRef: docRef.id,
        nombre: entity.nombre
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
    throw new Error('Method not implemented.');
  }
}
