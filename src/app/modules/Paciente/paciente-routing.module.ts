import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteGuardService } from 'src/app/guards/paciente-auth.service';
import { CrearTurnoPacienteComponent } from 'src/app/pages/Paciente/crear-turno-paciente/crear-turno-paciente.component';
import { ObtenerTurnosPacienteComponent } from 'src/app/pages/Paciente/obtener-turnos-paciente/obtener-turnos-paciente.component';
import { PacienteMainComponent } from 'src/app/pages/Paciente/paciente-main/paciente-main.component';

const routes: Routes = [
  {path: '', component: PacienteMainComponent, children: [
    {path: 'turnos', component: ObtenerTurnosPacienteComponent},
    {path: 'crear', component: CrearTurnoPacienteComponent}
  ], canActivate: [PacienteGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
