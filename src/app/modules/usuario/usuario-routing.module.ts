import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/Usuario/profile/profile.component';
import { AuthGuardService } from 'src/app/guards/auth.service';
import { LoginComponent } from 'src/app/pages/Usuario/login/login.component';
import { RegisterComponent } from 'src/app/pages/Usuario/register/register.component';
import { NoAuthGuardService } from 'src/app/guards/noauth.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate:[NoAuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate:[NoAuthGuardService]},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {}
