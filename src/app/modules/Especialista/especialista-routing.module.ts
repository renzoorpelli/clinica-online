import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaAuthGuardService } from 'src/app/guards/especialista-auth.service';
import { AgendaMainComponent } from 'src/app/pages/Especialista/agenda-main/agenda-main.component';
import { CrearAgendaEspecialistaComponent } from 'src/app/pages/Especialista/crear-agenda-especialista/crear-agenda-especialista.component';
import { CrearTurnosEspecialistaComponent } from 'src/app/pages/Especialista/crear-turnos-especialista/crear-turnos-especialista.component';
import { EspecialistaMainComponent } from 'src/app/pages/Especialista/especialista-main/especialista-main.component';
import { ObtenerAgendaComponent } from 'src/app/pages/Especialista/obtener-agenda/obtener-agenda.component';
import { ObtenerTurnosEspecialistaComponent } from 'src/app/pages/Especialista/obtener-turnos-especialista/obtener-turnos-especialista.component';
import { PacientesComponent } from 'src/app/pages/Especialista/pacientes/pacientes.component';

const routes: Routes = [
  {path: '', component: EspecialistaMainComponent, children: [
    {path: 'turnos', component: ObtenerTurnosEspecialistaComponent},
    {path: 'crear', component: CrearTurnosEspecialistaComponent},
    {path: 'agenda', component: AgendaMainComponent, children: [
      {path: 'crear', component: CrearAgendaEspecialistaComponent},
      {path: 'obtener', component: ObtenerAgendaComponent}
    ]},
    {path: "pacientes", component: PacientesComponent}
  ], canActivate: [EspecialistaAuthGuardService]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
