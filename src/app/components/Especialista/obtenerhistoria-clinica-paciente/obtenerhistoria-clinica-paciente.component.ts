import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-obtenerhistoria-clinica-paciente',
  templateUrl: './obtenerhistoria-clinica-paciente.component.html',
  styleUrls: ['./obtenerhistoria-clinica-paciente.component.css']
})
export class ObtenerhistoriaClinicaPacienteComponent {
  @Input() data!:any;
}
