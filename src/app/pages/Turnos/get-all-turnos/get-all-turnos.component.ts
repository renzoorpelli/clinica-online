import { Component } from '@angular/core';
import { Turno } from 'src/app/interfaces/Turno';

@Component({
  selector: 'app-get-all-turnos',
  templateUrl: './get-all-turnos.component.html',
  styleUrls: ['./get-all-turnos.component.css']
})
export class GetAllTurnosComponent {

  listadoTurnos!:Turno;

}
