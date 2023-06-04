import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';

@Pipe({
  name: 'especialistaPendiente'
})
export class EspecialistaPendientePipe implements PipeTransform {

  transform(value: Usuario[], ...args: unknown[]): Usuario[] {
    return [...value.filter(usr => usr.rol === "especialista" && usr.estado === "ingreso")];
  }

}
