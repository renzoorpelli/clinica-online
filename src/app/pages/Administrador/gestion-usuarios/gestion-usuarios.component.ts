import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ObtenerhistoriaClinicaPacienteComponent } from 'src/app/components/Especialista/obtenerhistoria-clinica-paciente/obtenerhistoria-clinica-paciente.component';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { ExcelService } from 'src/app/services/File/excel.service';
import { PacienteRepositoryService } from 'src/app/services/Paciente/paciente-repository.service';
import { UsuarioRepositoryService } from 'src/app/services/Usuario/usuario-repository.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit, OnDestroy{

  specialistList!:Especialista[]
  pacientList!:Paciente[]

  usersCommonList!:Usuario[];

  private _subscription!:Subscription;

  constructor(private _especialistRepository:EspecialistaRepositoryService, private _pacientRepository:PacienteRepositoryService, private _modalService: NgbModal, private _excelService:ExcelService, private _usuarioRepositoryService:UsuarioRepositoryService){

  }

  ngOnInit(): void {
    if(!this._subscription){

      this._subscription = this._especialistRepository.getAll().subscribe(data => {
        this.specialistList = data;
      })

      this._pacientRepository.getAll().subscribe(data => {
        this.pacientList = data
      })

      this._usuarioRepositoryService.getAll().subscribe(data => {
        this.usersCommonList = data;
      })
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


  onReviewClinicHistory(clinicHistory:any){
    const modalRef = this._modalService.open(ObtenerhistoriaClinicaPacienteComponent, {centered: true});

    modalRef.componentInstance.data = clinicHistory;

    modalRef.result.then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err);
    })
  }


  generateExcelUsers(data:any){
    this._excelService.generateSpreadSheet(data, "listadoUsuarios")
  }

}
