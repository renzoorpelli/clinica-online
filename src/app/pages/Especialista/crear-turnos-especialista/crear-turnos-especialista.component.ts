import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/interfaces/Especialidad';
import { Especialista } from 'src/app/interfaces/Especialista';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';
import { EspecialistaRepositoryService } from 'src/app/services/Especialista/especialista-repository.service';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { TurnosEspecialistaService } from 'src/app/services/Especialista/turnos-especialista.service';
import { UsuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-crear-turnos-especialista',
  templateUrl: './crear-turnos-especialista.component.html',
  styleUrls: ['./crear-turnos-especialista.component.css'],
})
export class CrearTurnosEspecialistaComponent {
  specialistFromLocalStorage!: Especialista;
  specialistUpdated!: Especialista;
  especialidadSeleccionada!: string;
  turnoForm!: FormGroup;
  daysSelection: { day: string; date: Date | string; selected: boolean }[] = [];
  dateOfShift!: Date;

  constructor(
    private _turnosService: TurnosEspecialistaService,
    private _usuarioService: UsuarioService,
    private _especialistaService: EspecialistaService,
    private _especialistRepository: EspecialistaRepositoryService
  ) {}

  ngOnInit(): void {
    this.specialistFromLocalStorage =
      this._usuarioService.getCurrentUserProfileLocalStorage();

    this._especialistRepository
      .getSpecialistByDocRef(
        this.specialistFromLocalStorage.docRefEspecialista!
      )
      .then((data) => {
        this.specialistUpdated = data.data() as Especialista;
      });

    this.turnoForm = new FormGroup({});
  }

  onSubmit() {
    const nuevoTurnoBase: Turno = {
      especialidad: this.especialidadSeleccionada,
      docRefEspecialista: this.specialistUpdated.docRefEspecialista,
      estado: EstadoTurno.Libre,
    };
    console.log(this.dateOfShift)

    let dateForShift = new Date(this.dateOfShift);

    dateForShift.setHours(9, 0, 0, 0);

    // como los turnos duran 1 hora, y trabaja 10 horas
    for (let i = 0; i < 10; i++) {
      const nuevoTurno = { ...nuevoTurnoBase };
      nuevoTurno.fechaTurno = dateForShift.toISOString();

      this._especialistaService.asignarTurnoEspecialista(
        nuevoTurno,
        nuevoTurno.docRefEspecialista!
      );
      // Incrementa la hora en uno
      dateForShift.setHours(dateForShift.getHours() + 1);
    }
  }

  filterDaysBySpeciality(speciality: string) {
    const daysOfSpecialities: {
      day: string;
      date: Date | string;
      selected: boolean;
    }[] = [];

    const specFiltered = this.specialistUpdated.especialidades?.filter(
      (esp) => esp.nombre === speciality
    );

    if (!specFiltered) {
      return;
    }

    for (let i = 0; i < specFiltered.length; i++) {
      const speciality = specFiltered[i];
      const numbers = this._turnosService.obtenerNumerosDias(
        speciality.agenda.dia.toLocaleLowerCase()
      );

      numbers.forEach((date) => {
        daysOfSpecialities.push({
          day: speciality.agenda.dia,
          date: `${date.getUTCFullYear()}-${
            date.getUTCMonth() + 1
          }-${date.getUTCDate()}`,
          selected: false,
        });
      });
    }

    const turnoDates = this.specialistUpdated.turnos?.map((turno) => {
      const fecha = new Date(turno.fechaTurno!);
      return `${fecha.getUTCFullYear()}-${
        fecha.getUTCMonth() + 1
      }-${fecha.getUTCDate()}`;
    });

    this.daysSelection = daysOfSpecialities.filter(
      (day) => !turnoDates?.includes(day.date.toLocaleString())
    );
  }
  toggleDaySelection(day: {
    day: string;
    date: Date | string;
    selected: boolean;
  }) {
    day.selected = !day.selected;
    this.dateOfShift = day.date as Date;
  }
}
