import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agenda, Especialidad } from 'src/app/interfaces/Especialidad';
import { Especialista } from 'src/app/interfaces/Especialista';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-crear-agenda-especialista',
  templateUrl: './crear-agenda-especialista.component.html',
  styleUrls: ['./crear-agenda-especialista.component.css']
})
export class CrearAgendaEspecialistaComponent {
  AVAILABLE_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  // Asume que recibes la especialidad del especialista como una entrada o la obtienes de otro modo
  especialidad!: Especialidad;
  agendaForm!: FormGroup;
  especialidadSeleccionada!: string;
  specialistFromLocalStorage!: Especialista;
  specialistUpdated!:Especialista;
  listadoEspecialsitas!:Especialista[];


  constructor(private _usuarioService:UsuarioService, private _especialistaService: EspecialistaService, private _especialistRepository: EspecialistaRepositoryService) { }

  ngOnInit(): void {
    this.specialistFromLocalStorage = this._usuarioService.getCurrentUserProfileLocalStorage();

    this._especialistRepository.getSpecialistByDocRef(this.specialistFromLocalStorage.docRefEspecialista!).then(data => {
      this.specialistUpdated = data.data() as Especialista;
    })

    this.agendaForm = new FormGroup({
      'dia': new FormControl("Lunes", Validators.required),
      'horaInicio': new FormControl(null, [Validators.required]),
      'horaFin': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const nuevoHorario: Agenda= {
      dia: this.agendaForm.value['dia'],
      desde: this.agendaForm.value['horaInicio'],
      hasta: this.agendaForm.value['horaFin']
    };


    const especialidad: Especialidad = {
      nombre: this.especialidadSeleccionada,
      agenda: nuevoHorario
    }
    this._especialistaService.asignarEspecialidadEspecialista(especialidad,this.specialistFromLocalStorage.docRefEspecialista!)

  }


  filterDaysAvailable():string[] {
    let daysOff:string[] = [];

    this.specialistUpdated.especialidades?.forEach(esp => {
      daysOff.push(esp.agenda.dia);
    });

    return this.AVAILABLE_DAYS.filter(day => !daysOff.includes(day));
  }

}
