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
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Usuario } from 'src/app/interfaces/Usuario';


@Injectable({
  providedIn: 'root',
})
export class UsuarioRepositoryService implements Repository<Usuario> {
  listadoUsuarios!: CollectionReference<DocumentData>;

  listadoUsuarios$!: Observable<Usuario[]>;

  constructor(private _firestore: Firestore) {
    this.listadoUsuarios = collection(this._firestore, 'usuarios');
    this.listadoUsuarios$ = collectionData(this.listadoUsuarios) as Observable<
      Usuario[]
    >;
  }
  getAll(): Observable<Usuario[]> {
    return this.listadoUsuarios$;
  }

  create(entity: Usuario, uid:string): string {
    if (this.listadoUsuarios) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoUsuarios);
      const newItem: any = {
        ...entity,
        idUsuarioDocRef: docRef.id,
        idUsuarioUid: uid
      };

      console.log(newItem);
      setDoc(docRef, newItem);
      return docRef.id;
    }
    return "";
  }
  update(docRef: string, ...args: unknown[]): boolean {
    try{
      const documentReference = doc(this.listadoUsuarios, docRef);
      updateDoc(documentReference, {estado: args[0]})
      return true;

    }catch(e){
      console.log(e);
      return false;
    }
  }
  delete(docRef: string): boolean {
    // el guid que genera el doc

    try{
      const documentReference = doc(this.listadoUsuarios,docRef);
      deleteDoc(documentReference);
      return true;

    }catch(e){
      console.log(e);
      return false;
    }
  }
}
