import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';

@Pipe({
  name: 'pacientePendiente'
})
export class PacientePendientePipe implements PipeTransform {

  transform(value: Usuario[], ...args: unknown[]): Usuario[] {
    return [...value.filter(usr => usr.rol  === "paciente" && usr.estado  === "ingreso")];
  }

}
