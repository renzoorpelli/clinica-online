import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Usuario } from 'src/app/interfaces/Usuario';

@Pipe({
  name: 'especialistasNombre'
})
export class EspecialistasNombrePipe implements PipeTransform {

  transform(value: Usuario[], nombre: string): Usuario[] {
    if(!value){
      return [];
    }
    return [...value.filter(esp => esp.rol === "especialista" &&  esp.nombre!.includes(nombre) || esp.apellido!.includes(nombre))]
  }

}
