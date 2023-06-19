import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObtenerhistoriaClinicaPacienteComponent } from 'src/app/components/Especialista/obtenerhistoria-clinica-paciente/obtenerhistoria-clinica-paciente.component';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userFromLocalStorage?:Usuario | null;
  userProfileLocalStorage?:any;
  ngOnInit(): void {
    this.userFromLocalStorage = this._userService.getCurrentUserLocalStorage();
    this.userProfileLocalStorage = this._userService.getCurrentUserProfileLocalStorage();
  }

  constructor(private _userService: UsuarioService, private _router: Router, private _modalService: NgbModal){}

  logOut(){
    this.userFromLocalStorage = undefined;
    this._userService.deleteUserFromLocalStorage();
    this._router.navigate(['usuario/login'])
  }


  onReviewClinicHistory(){
    const modalRef = this._modalService.open(ObtenerhistoriaClinicaPacienteComponent, {centered: true});

    modalRef.componentInstance.data = this.userProfileLocalStorage.historiaClinica;

    modalRef.result.then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err);
    })
  }
}
