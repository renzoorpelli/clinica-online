import { Injectable } from '@angular/core';
import { Repository } from 'src/app/Data/common-repository.interface';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  arrayUnion,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Especialidad } from 'src/app/interfaces/Especialidad';
import { Turno } from 'src/app/interfaces/Turno';

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

      updateDoc(documentReference, { estado: 'admitido' });
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  updateSpecialityAttribute(docRef: string, especialidad:Especialidad): boolean {
    try {
      const documentReference = doc(this.listadoEspecialistas, docRef);
      updateDoc(documentReference, {
        especialidades: arrayUnion(especialidad)
      });
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  updateShiftAttriubte(turno:Turno, docRefEspecialista:string ){
    try {
      const documentReference = doc(this.listadoEspecialistas, docRefEspecialista);
      updateDoc(documentReference, {
        turnos: arrayUnion(turno)
      });
    } catch (e) {
      console.log(e);
    }
    return false;
  }


  delete(docRef: string): boolean {
    try {
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
        (u) => u.idUsuarioDocRef === docRef
      )!;

      return especilista.docRefEspecialista;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getSpecialistByDocRef(specialistDocRef:string):Promise<DocumentSnapshot>{
      const documentReference = doc(this.listadoEspecialistas, specialistDocRef);
      return await getDoc(documentReference);
  }

  updateStatusOfShift(docRefEspecialista:string, docRefShift:string, shiftModified:Turno){
    const especialista = this.getSpecialistByDocRef(docRefEspecialista);

    especialista.then(data => {
      let especialistFromFirebase = data.data() as Especialista;

      const index = especialistFromFirebase.turnos!.findIndex(t => t.idTurnoDocRef === docRefShift);

      if (index !== -1) {
        especialistFromFirebase.turnos![index] = shiftModified;

        // Ahora debes actualizar el especialista en Firebase

        const specialistRef = doc(this.listadoEspecialistas, docRefEspecialista);
        updateDoc(specialistRef, {turnos: especialistFromFirebase.turnos});
      } else {
        console.log("No se encontró el turno");
      }
    });


  }
}
