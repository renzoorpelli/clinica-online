import { Component } from '@angular/core';
import { TypeOfGraph } from 'src/app/enums/typeOfGraph';

@Component({
  selector: 'app-obtener-estadisticas',
  templateUrl: './obtener-estadisticas.component.html',
  styleUrls: ['./obtener-estadisticas.component.css']
})
export class ObtenerEstadisticasComponent {
  selectedOption!: number;
  showSpinner = false;
  constructor(){}

  onSelectGraph(type:number){
    this.selectedOption = type;
    this.showSpinner = true;
  }

  onHandleEvent($event:boolean){
    this.showSpinner = $event;
  }
}
