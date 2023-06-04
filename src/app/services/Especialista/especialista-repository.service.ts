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

@Injectable({
  providedIn: 'root',
})
export class EspecialistaRepositoryService implements Repository<Especialista> {
  listadoEspecialistas!: CollectionReference<DocumentData>;

  listadoEspecialistas$!: Observable<Especialista[]>;

  constructor(private _firestore: Firestore) {
    this.listadoEspecialistas = collection(this._firestore, 'especialistas');
    this.listadoEspecialistas$ = collectionData(
      this.listadoEspecialistas
    ) as Observable<Especialista[]>;
  }
  getAll(): Observable<Especialista[]> {
    return this.listadoEspecialistas$;
  }

  create(entity: Especialista, uid: string): string {
    if (this.listadoEspecialistas) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(
        this.listadoEspecialistas
      );
      const newItem: any = {
        ...entity,
        docRefEspecialista: docRef.id,
        idUsuarioUid: uid,
      };

      setDoc(docRef, newItem);
      return docRef.id;
    }
    return '';
  }
  update(docRef: string, ...args: unknown[]): boolean {
    console.log(docRef);
    try {
      const documentReference = doc(this.listadoEspecialistas, docRef);

      updateDoc(documentReference, { estado: 'sarasa' });
    } catch (e) {
      console.log(e);
    }
    return false;
  }
  delete(docRef: string): boolean {
    try {
      console.log(docRef);
      const documentReference = doc(this.listadoEspecialistas, docRef);

      deleteDoc(documentReference);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    // el guid que genera el doc
  }

  async getEspecialistaByDocRefUsuario(docRef: string) {
    try {
      let especialistas: Especialista[] = [];

      await new Promise<void>((resolve) => {
        let especialistasSub = this.listadoEspecialistas$.subscribe((data) => {
          especialistas = data;
          especialistasSub.unsubscribe();
          resolve(); // Signal that the data is available
        });
      });

      let especilista: Especialista = especialistas!.find(
        (u) => u.docRefUsuario === docRef
      )!;

      return especilista.docRefEspecialista;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
