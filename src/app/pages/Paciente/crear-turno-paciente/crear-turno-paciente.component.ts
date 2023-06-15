import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/interfaces/Especialista';
import { Paciente } from 'src/app/interfaces/Paciente';
import { EstadoTurno, Tratamiento, Turno } from 'src/app/interfaces/Turno';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { TurnoService } from 'src/app/services/Turno/turno.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-turno-paciente',
  templateUrl: './crear-turno-paciente.component.html',
  styleUrls: ['./crear-turno-paciente.component.css']
})
export class CrearTurnoPacienteComponent implements OnInit, OnDestroy{
  specialistList!:Especialista[];
  subscription!:Subscription;
  turnoPacienteForm!:FormGroup;
  docRefSpecialistSelected!:string;
  selectedSpecialist!:Especialista;
  specialitySelected!:string;
  selectedShiftDocRef!:string;
  selectedShift!:Turno;
  currentUserFromLocalStorage: Paciente;
  selectedTypeOfShift!:string;
  TYPE_SHIFT:string[] = ["Consulta", "Tratamiento"];

  constructor(private _especialistaRepService:EspecialistaRepositoryService, private _usuarioService: UsuarioService, private turnoService:TurnoService, private router:Router){
    this.currentUserFromLocalStorage = this._usuarioService.getCurrentUserProfileLocalStorage();
  }

  ngOnInit(): void {
    this.turnoPacienteForm = new FormGroup({
      'aceptaTerminos': new FormControl(false, Validators.required),
    });

    if(!this.subscription){
      this.subscription = this._especialistaRepService.getAll().subscribe(data => {
        this.specialistList = data;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEspecialistaChange() {
   this.selectedSpecialist = this.specialistList.find(esp => esp.docRefEspecialista === this.docRefSpecialistSelected)!;

   console.log(this.selectedSpecialist)
  }
  onEspecialidadChange(){
    this.selectedSpecialist.turnos = [...this.selectedSpecialist.turnos!];
  }

  onTurnoChange(){
    this.selectedShift = this.selectedSpecialist.turnos!.find(t => t.idTurnoDocRef === this.selectedShiftDocRef)!;
    console.log(this.selectedShift)
  }

  alertaMensajeSucces(mensaje: string): void {
    Swal.fire({
      title: 'Sucess!',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar', //,
      //confirmButtonAriaLabel: '<a routerLink="usuario/login"></a>',
    });
  }

  alertaMensajeError(mensaje: string): void {
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  onSubmit(){
    const turno = {...this.selectedShift};
    turno.docRefPaciente = this.currentUserFromLocalStorage.docRefPaciente;

    if(this.selectedTypeOfShift.toLocaleLowerCase() ==="consulta"){
      turno.tipo = Tratamiento.Consulta
    }else{
      turno.tipo = Tratamiento.Tratamiento
    }
    turno.estado = EstadoTurno.Pendiente;

    let response:boolean = this.turnoService.setShiftToPacient(turno, this.currentUserFromLocalStorage.docRefPaciente!);

    if(response){
        this.alertaMensajeSucces("Turno asigando con éxito, en espera de aprobación por especialista");
        this.router.navigate(['paciente/turnos']);
    }else{
      this.alertaMensajeError("Hubo un error al tratar de asignarte el turno");
    }
  }
}
