import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/Usuario/profile/profile.component';
import { AuthGuardService } from 'src/app/guards/auth.service';
import { LoginComponent } from 'src/app/pages/Usuario/login/login.component';
import { RegisterComponent } from 'src/app/pages/Usuario/register/register.component';
import { AdmisionComponent } from 'src/app/pages/Usuario/admision/admision.component';
import { AdminAltaComponent } from 'src/app/pages/Usuario/admin-alta/admin-alta.component';
import { NoAuthGuardService } from 'src/app/guards/noauth.service';
import { AdminAuthGuardService } from 'src/app/guards/admin-auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate:[NoAuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate:[NoAuthGuardService]},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService] },
  {
    path: 'admin',
    component: AdmisionComponent,
    canActivate:[AdminAuthGuardService],
    children: [
      { path: 'add', component: AdminAltaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {}
