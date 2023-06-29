import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { PacienteMainComponent } from 'src/app/pages/Paciente/paciente-main/paciente-main.component';
import { CrearTurnoPacienteComponent } from 'src/app/pages/Paciente/crear-turno-paciente/crear-turno-paciente.component';
import { ObtenerTurnosPacienteComponent } from 'src/app/pages/Paciente/obtener-turnos-paciente/obtener-turnos-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../Common/form.module';
import { FilterShiftBySpecialityPipe } from 'src/app/pipes/paciente/filter-shift-by-speciality.pipe';
import { TurnoService } from 'src/app/services/Turno/turno.service';
import { FormatDatePipe } from 'src/app/pipes/paciente/format-date.pipe';
import { FilterShiftBySpecialistPipe } from 'src/app/pipes/paciente/filter-shift-by-specialist.pipe';
import { ToolTipSpecialityDirective } from 'src/app/directives/paciente/tool-tip-speciality.directive';


@NgModule({
  declarations: [
    PacienteMainComponent,
    CrearTurnoPacienteComponent,
    ObtenerTurnosPacienteComponent,
    FilterShiftBySpecialityPipe,
    FormatDatePipe,
    FilterShiftBySpecialistPipe,
    ToolTipSpecialityDirective
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    ReactiveFormsModule,
    FormModule,
    FormsModule
  ],
  exports: [
    FormatDatePipe
  ],
  providers:[
    PacienteRepositoryService,
    TurnoService
  ]

})
export class PacienteModule { }
