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
  query,
  where
} from '@angular/fire/firestore';
import {Storage, ref, uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage';
import { collection } from '@firebase/firestore';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Especialidad } from 'src/app/interfaces/Especialidad';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';
import { TurnoRepositoryService } from '../Turno/turno-repository.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileImageService  {
  downloadURL: any;

  constructor(private _storage:Storage){

  }

  saveImage(image: File, uidUsuario:string) {
    var filePath = `${image.name}_${new Date().getTime()}`;

    const imgRef = ref(this._storage, `images/${uidUsuario}/${filePath}`);

    return uploadBytes(imgRef, image)
  }

  saveImages(iamges:File[], uidUsuario:string){
    iamges.forEach(img => this.saveImage(img, uidUsuario))
  }

  async getImagesById(uid: string): Promise<string[]> {
    const urls: string[] = [];
    const imagesRef = ref(this._storage, `images/${uid}`);

    const result = await listAll(imagesRef);

    for (const item of result.items) {
      const downloadURL = await getDownloadURL(item);
      urls.push(downloadURL);
    }

    return urls;
  }


}
