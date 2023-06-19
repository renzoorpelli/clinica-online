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


@NgModule({
  declarations: [
    AdmisionComponent,
    AdminAltaComponent,
    EspecialistaPendientePipe,
    PacientePendientePipe,
    GestionUsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    CommonModule,
    AdministradorRoutingModule
  ],
  providers:[
    ExcelService
  ]
})
export class AdministradorModule { }
