import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/guards/admin-auth.service';
import { AdminAltaComponent } from 'src/app/pages/Administrador/admin-alta/admin-alta.component';
import { AdmisionComponent } from 'src/app/pages/Administrador/admision/admision.component';

const routes: Routes = [
  {
    path: '',
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
export class AdministradorRoutingModule { }
