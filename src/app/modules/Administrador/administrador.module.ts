import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdmisionComponent } from 'src/app/pages/Administrador/admision/admision.component';
import { AdminAltaComponent } from 'src/app/pages/Administrador/admin-alta/admin-alta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../Common/form.module';
import { EspecialistaPendientePipe } from 'src/app/pipes/especialista/especialista-pendiente.pipe';
import { PacientePendientePipe } from 'src/app/pipes/paciente/paciente-pendiente.pipe';
import { GestionUsuariosComponent } from 'src/app/pages/Administrador/gestion-usuarios/gestion-usuarios.component';
import { ExcelService } from 'src/app/services/File/excel.service';
import { ObtenerEstadisticasComponent } from 'src/app/pages/Administrador/obtener-estadisticas/obtener-estadisticas.component';
import { GenerateGraphComponent } from 'src/app/components/Administrador/generate-graph/generate-graph.component';
import { PDFService } from 'src/app/services/File/pdf.service';
import { GraphService } from 'src/app/services/Administrador/graph.service';
import { LoadingSpinnerComponent } from 'src/app/components/common/loading-spinner/loading-spinner.component';
import { ShiftsPacientComponent } from 'src/app/components/Administrador/shifts-pacient/shifts-pacient.component';
import { PacienteModule } from '../Paciente/paciente.module';


@NgModule({
  declarations: [
    AdmisionComponent,
    AdminAltaComponent,
    EspecialistaPendientePipe,
    PacientePendientePipe,
    GestionUsuariosComponent,
    ObtenerEstadisticasComponent,
    GenerateGraphComponent,
    LoadingSpinnerComponent,
    ShiftsPacientComponent
  ],
  imports: [
    AdministradorRoutingModule,
    CommonModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    CommonModule,
    PacienteModule
  ],
  providers:[
    ExcelService,
    PDFService,
    GraphService
  ]
})
export class AdministradorModule { }
