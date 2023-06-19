import { Pipe, PipeTransform } from '@angular/core';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';

@Pipe({
  name: 'filterShiftBySpeciality'
})
export class FilterShiftBySpecialityPipe implements PipeTransform {

  transform(value: Turno[], speciality:string): Turno[] {
    return [...value.filter(t => t.especialidad === speciality && t.estado === EstadoTurno.Libre)]
  }

}
