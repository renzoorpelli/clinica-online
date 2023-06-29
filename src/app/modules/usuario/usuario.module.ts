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
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { NoAuthGuardService } from 'src/app/guards/noauth.service';
import { AdminAuthGuardService } from 'src/app/guards/admin-auth.service';
import { CaptchaValidatorDirective } from 'src/app/directives/Register/captcha-validator.directive';
import { ProfileImageService } from 'src/app/services/File/profile-image.service';
import { ProfilePhotoZoomDirective } from 'src/app/directives/Usuario/profile-photo-zoom.directive';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CaptchaValidatorDirective,
    ProfilePhotoZoomDirective
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
    ProfileImageService
  ]
})
export class UsuarioModule { }
