import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData, DocumentReference, Firestore, Timestamp, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { UsuarioLog } from 'src/app/interfaces/UsuarioLog';

@Injectable({
  providedIn: 'root',
})
export class UsuarioLogService {

  listadoLogUsuario!: CollectionReference<DocumentData>;
  listadoLogUsuario$!: Observable<UsuarioLog[]>;
  constructor(private _firestore: Firestore){
    this.listadoLogUsuario = collection(this._firestore, 'logsusuario');

    this.listadoLogUsuario$ = collectionData(this.listadoLogUsuario) as Observable<
    UsuarioLog[]
    >;
  }
  log(uidUsuario:string, idDocRefUsuario:string){
    if (this.listadoLogUsuario) {
      let docRef: DocumentReference<DocumentData> = doc(this.listadoLogUsuario);
      const newItem: any = {
        fecha: Timestamp.now().toDate(),
        idLog: docRef.id,
        idUsuarioDocRef: idDocRefUsuario,
        idUsuarioUid: uidUsuario
      };
      setDoc(docRef, newItem);
      return true;

    }
    return false;
  }

  getAll(){
    return this.listadoLogUsuario$;
  }

}
