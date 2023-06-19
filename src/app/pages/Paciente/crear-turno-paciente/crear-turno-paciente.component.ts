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

  specialistSelected:boolean = false;
  specialityShowSelected:boolean = false;
  shiftSelected:boolean=false;


  SPECIALITIES: {key:string, value:string}[]= [

    {key:"doctor", value: "https://st4.depositphotos.com/1325771/39154/i/600/depositphotos_391545206-stock-photo-happy-male-medical-doctor-portrait.jpg"},
    {key:"pediatra", value: "https://static.eldiario.es/clip/4571af46-875a-47bd-80d6-445b11120382_16-9-discover-aspect-ratio_default_1058469.webp"},
    {key:"clinica", value: "https://www.hpc.org.ar/wp-content/uploads/Medico-Clinico.jpg"},
    {key:"dentista", value: "https://enbatadental.com/wp-content/uploads/2021/04/ABRASION-DENTAL-1.jpg"},
    {key:"default", value: "https://www.hpc.org.ar/wp-content/uploads/Medico-Clinico.jpg"}

  ];

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

  onEspecialistaChange(specialist:Especialista) {
   this.selectedSpecialist = specialist;
   this.specialistSelected = true;
  }
  onEspecialidadChange(speciality:string){
    console.log(speciality)
    this.specialityShowSelected = true;
    this.specialitySelected = speciality;
    this.selectedSpecialist.turnos = [...this.selectedSpecialist.turnos!];
  }

  onTurnoChange(shiftSelected:Turno){
    this.selectedShift = shiftSelected;
    this.shiftSelected = true;
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


  getImageSpeciality(speciality:string):string{
    const foundSpeciality = this.SPECIALITIES.find(s => s.key.includes(speciality.toLocaleLowerCase()));

    return foundSpeciality ? foundSpeciality.value : this.SPECIALITIES.filter(s => s.key ==="default")[0].value;
  }


  undoChanges(){
    this.specialistSelected = false;
    this.specialityShowSelected = false;
    this.shiftSelected = false;
    !this.turnoPacienteForm.get('aceptaTerminos')?.setValue(false);
  }
}
