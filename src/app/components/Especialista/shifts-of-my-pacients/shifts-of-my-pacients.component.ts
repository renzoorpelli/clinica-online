import { Component, Input, OnInit } from '@angular/core';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';

@Component({
  selector: 'app-shifts-of-my-pacients',
  templateUrl: './shifts-of-my-pacients.component.html',
  styleUrls: ['./shifts-of-my-pacients.component.css'],
})
export class ShiftsOfMyPacientsComponent implements OnInit{
  @Input() data: any;

  randomIndexes!: number[];
  resenias: string[] = [
    'Excelente Atención',
    'Podría mejorar',
    'No fué Claro',
    'No disponible',
    'Excelente como siempre',
    'Sigo con dudas',
  ];

  constructor(private _specialistService: EspecialistaService) {

  }

  ngOnInit(): void {
    this.randomIndexes = this.generateRandomIndexes(this.data.turnos.length);
  }

  returnNameShiftState(number: number): string {
    return this._specialistService.returnShiftNameByNumber(number);
  }

  returnNameOfTypeShift(number: number): string {
    return this._specialistService.returnShiftTypeByNum(number);
  }

  generateRandomIndexes(length: number): number[] {
    const indexes = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.resenias.length);
      indexes.push(randomIndex);
    }
    return indexes;
  }
}
