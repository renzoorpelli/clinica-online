import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/Common/Home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'usuario', loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'admin', loadChildren: () => import('./modules/Administrador/administrador.module').then(m => m.AdministradorModule) },
  { path: 'especialista', loadChildren: () => import('./modules/Especialista/especialista.module').then(m => m.EspecialistaModule) },
  { path: 'paciente', loadChildren: () => import('./modules/Paciente/paciente.module').then(m => m.PacienteModule) },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
