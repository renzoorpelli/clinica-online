import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Usuario } from 'src/app/interfaces/Usuario';

@Pipe({
  name: 'especialistasEspecialidad'
})
export class EspecialistasEspecialidadPipe implements PipeTransform {

  transform(value: Usuario[], especialista: Especialista[], especialidad:string): Usuario[] {
    if(!value){
      return [];
    }
      let specialistFromUser = value.filter(esp => esp.rol === "especialista");

      let filteredSpecialist =  especialista.filter(esp => esp.especialidad && esp.especialidad!.includes(especialidad));

      let filteredSpecialistIds = filteredSpecialist.map(esp => esp.idUsuarioDocRef);

    return [...specialistFromUser.filter(esp => filteredSpecialistIds.includes(esp.idUsuarioDocRef))];
  }

}
