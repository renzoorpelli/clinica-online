import { Component, Input } from '@angular/core';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PDFService } from 'src/app/services/File/pdf.service';

@Component({
  selector: 'app-shifts-pacient',
  templateUrl: './shifts-pacient.component.html',
  styleUrls: ['./shifts-pacient.component.css']
})
export class ShiftsPacientComponent {
  @Input() data?:any;

  constructor(private _especialistService:EspecialistaService, private _pdfService:PDFService){}

  returnNameShiftState(number:number):string{
    return this._especialistService.returnShiftNameByNumber(number);
  }

  returnNameOfTypeShift(number:number):string{
    return this._especialistService.returnShiftTypeByNum(number);
  }

  onExportAsPDF(){
    let table = document.getElementsByTagName('table')[1];
    this._pdfService.generatePDF(table!, `Turnos del paciente: ${this.data.nombre} ${this.data.apellido}`)
  }

}
