import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';

@Pipe({
  name: 'filtrarEspecialistas'
})
export class FiltrarEspecialistasPipe implements PipeTransform {

  transform(value: Usuario[], ...args: unknown[]): Usuario[] {
    if(!value)return [];

    return [...value.filter(u => u.rol==="especialista")]
  }

}
