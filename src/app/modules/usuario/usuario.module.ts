import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from 'src/app/pages/Usuario/login/login.component';
import { RegisterComponent } from 'src/app/pages/Usuario/register/register.component';

import { ProfileComponent } from 'src/app/pages/Usuario/profile/profile.component';
import { UsuarioLogService } from 'src/app/services/Usuario/usuario-log.service';
import { UsuarioRepositoryService } from 'src/app/services/Usuario/usuario-repository.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

import { AuthGuardService } from 'src/app/guards/auth.service';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormModule } from '../Common/form.module';
import { EspecialidadRepositoryService } from 'src/app/services/Especialidad/especialidad-repository.service';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { AdmisionComponent } from 'src/app/pages/Usuario/admision/admision.component';
import { EspecialistaPendientePipe } from 'src/app/pipes/especialista/especialista-pendiente.pipe';
import { PacientePendientePipe } from 'src/app/pipes/paciente/paciente-pendiente.pipe';
import { AdminAltaComponent } from 'src/app/pages/Usuario/admin-alta/admin-alta.component';
import { NoAuthGuardService } from 'src/app/guards/noauth.service';
import { AdminAuthGuardService } from 'src/app/guards/admin-auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdmisionComponent,
    EspecialistaPendientePipe,
    PacientePendientePipe,
    AdminAltaComponent

  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule
  ],
  providers: [
    UsuarioLogService,
    UsuarioRepositoryService,
    UsuarioService,
    AdminAuthGuardService,
    NoAuthGuardService,
    AuthGuardService,
    EspecialidadRepositoryService,
    EspecialistaRepositoryService,
    PacienteRepositoryService
  ]
})
export class UsuarioModule { }
