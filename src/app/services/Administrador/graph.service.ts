import { Injectable } from '@angular/core';
import {Subscription } from 'rxjs';
import { TurnoRepositoryService } from '../Turno/turno-repository.service';
import { EstadoTurno, Turno } from 'src/app/interfaces/Turno';
import { UsuarioLogService } from '../Usuario/usuario-log.service';
import { UsuarioLog } from 'src/app/interfaces/UsuarioLog';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private  DAYS_OF_WEEK: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  shifts:Turno[] = [];
  logs:UsuarioLog[] = [];
  TOTAL_SHIFTS = 0;
  private _subscription!:Subscription;

  constructor(private _shiftsRepository:TurnoRepositoryService, private _userLogService:UsuarioLogService){
    if(!this._subscription){
      this._subscription = this._shiftsRepository.getAll().subscribe(data => {
        this.shifts = data;
        this.TOTAL_SHIFTS = this.shifts.length;
      })

      this._userLogService.getAll().subscribe(data => {
        this.logs = data;
      })

    }
    //this._subscription.unsubscribe();

  }

  getShiftsBySpeciality(){
    if(!this.shifts){
      return;
    }
    let specialityCount = this.shifts.reduce((count: { [speciality: string]: number }, shift) => {
      let speciality: string = shift.especialidad!;
      if(count[speciality!]) {
        count[speciality!]++;
      } else {
        count[speciality!] = 1;
      }
      return count;
    }, {});

    return specialityCount;
  }

  getShiftsPerDay(){
    let shiftsPerDay = this.shifts.reduce((count: { [day: string]: number }, shift: Turno) => {
      let date = new Date(shift.fechaTurno!);
      let dayOfWeek = this.DAYS_OF_WEEK[date.getDay()];
      if(count[dayOfWeek]) {
        count[dayOfWeek]++;
      } else {
        count[dayOfWeek] = 1;
      }
      return count;
    }, {});



    return shiftsPerDay;
  }

  getShiftInLapseOfTime(lapseOfTimeInDays:number){
    let currentDate = new Date();

    let shiftsInLapseOfTime = this.shifts.filter((shift: Turno) => {
      let shiftDate = new Date(shift.fechaTurno!);
      let timeDifference = Math.abs(currentDate.getTime() - shiftDate.getTime());
      let differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      return differenceInDays <= lapseOfTimeInDays;
    });

    return shiftsInLapseOfTime;
  }

  getFinsihedShiftInLapseOfTime(lapseOfTimeInDays:number){
    let currentDate = new Date();

    let shiftsInLapseOfTime = this.shifts.filter((shift: Turno) => {
      let shiftDate = new Date(shift.fechaTurno!);
      let timeDifference = Math.abs(currentDate.getTime() - shiftDate.getTime());
      let differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      return differenceInDays <= lapseOfTimeInDays && shift.estado == EstadoTurno.Realizado;
    });

    return shiftsInLapseOfTime;
  }

  // getLogsOfUsers(): UsuarioLog[] | undefined{
  //   return this.logs;
  // }


  getLogsOfUsers(): { [day: string]: number } {
    return this.logs.reduce((counts: { [day: string]: number }, log) => {
      const milliseconds = log.fecha!.seconds * 1000 + log.fecha!.nanoseconds / 1000000;
      const date = new Date(milliseconds);
      const dateString = date.toISOString().slice(0,10);

      counts[dateString] = (counts[dateString] || 0) + 1;

      return counts;
    }, {});
  }
}
