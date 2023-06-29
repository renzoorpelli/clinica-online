import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { PDFService } from 'src/app/services/File/pdf.service';

@Component({
  selector: 'app-obtenerhistoria-clinica-paciente',
  templateUrl: './obtenerhistoria-clinica-paciente.component.html',
  styleUrls: ['./obtenerhistoria-clinica-paciente.component.css']
})
export class ObtenerhistoriaClinicaPacienteComponent implements OnInit, OnDestroy{
  @Input() data!:any;
  @Input() userCaller?:Usuario;

  constructor(private _pdfService:PDFService){

  }

  ngOnInit(): void {
    console.log(this.data)
  }

  ngOnDestroy(): void {
    this.data = undefined
  }
  exportAsPdf(){

    let card = document.getElementById("elementPrint")!;

    this._pdfService.generatePDF(card, `Historia clínica: ${this.userCaller?.nombre} ${this.userCaller?.apellido}`)
  }
}
