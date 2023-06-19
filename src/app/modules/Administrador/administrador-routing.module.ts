import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/guards/admin-auth.service';
import { AdminAltaComponent } from 'src/app/pages/Administrador/admin-alta/admin-alta.component';
import { AdmisionComponent } from 'src/app/pages/Administrador/admision/admision.component';
import { GestionUsuariosComponent } from 'src/app/pages/Administrador/gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: AdmisionComponent,
    canActivate:[AdminAuthGuardService],
    children: [
      { path: 'add', component: AdminAltaComponent },
    ]
  },
  {path:'gestion', component: GestionUsuariosComponent,canActivate:[AdminAuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
