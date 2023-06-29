import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Turno } from 'src/app/interfaces/Turno';

@Pipe({
  name: 'filterShiftBySpecialist'
})
export class FilterShiftBySpecialistPipe implements PipeTransform {

  transform(value: Turno[], docRefEspecialista:string): Turno[] {
    return [...value.filter(t => t.docRefEspecialista === docRefEspecialista)]
  }

}
