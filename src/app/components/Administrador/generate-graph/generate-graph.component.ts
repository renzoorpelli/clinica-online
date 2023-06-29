import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TypeOfGraph } from 'src/app/enums/typeOfGraph';
import { GraphService } from 'src/app/services/Administrador/graph.service';
import { PDFService } from 'src/app/services/File/pdf.service';
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from 'chart.js';
import { UsuarioLog } from 'src/app/interfaces/UsuarioLog';

@Component({
  selector: 'app-generate-graph',
  templateUrl: './generate-graph.component.html',
  styleUrls: ['./generate-graph.component.css'],
})
export class GenerateGraphComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @Input('typeGraph') type?: TypeOfGraph;
  @Output() onHideEmmitter: EventEmitter<boolean> = new EventEmitter();
  chart: any = [];
  data!: any;

  constructor(
    private _graphService: GraphService,
    private _pdfService: PDFService
  ) {
    Chart.register(
      BarElement,
      BarController,
      CategoryScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      LinearScale,
      LineController,
      PointElement,
      LineElement
    );
  }

  ngOnInit(): void {
    switch (this.type) {
      case TypeOfGraph.shiftsBySpeciality:
        setTimeout(() => {
          this.data = this._graphService.getShiftsBySpeciality();
          this.generateChartDays('Turnos por especialidad');
          this.onHideSpinner();
        }, 3000);
        break;
      case TypeOfGraph.finishedShiftInLapseOfTime:
        setTimeout(() => {
          this.data = this._graphService.getFinsihedShiftInLapseOfTime(30); //30 days
          //this.generateChart('Turnos finalizados en 30 días');
          this.onHideSpinner();
        }, 3000);
        break;
      case TypeOfGraph.shiftPerDay:
        setTimeout(() => {
          this.data = this._graphService.getShiftsPerDay();
          this.generateChartDays('Turnos por día de la semana');
          this.onHideSpinner();
        }, 3000);

        break;
      case TypeOfGraph.shiftInLapseOfTime:
        setTimeout(() => {
          this.data = this._graphService.getShiftInLapseOfTime(30); //30 days
          //this.generateChart('Turnos en 30 días');
          this.onHideSpinner();
        }, 3000);
        break;
      case TypeOfGraph.logsOfUser:
        setTimeout(() => {
          this.generateChartLogs('Ingresos de los usuarios');
          this.onHideSpinner();
        }, 4000);
        break;
    }
  }

  generateChartDays(title: string) {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(this.data),
        datasets: [
          {
            label: title,
            data: Object.values(this.data),
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //point StylingChart
  generateChartLogs(title: string) {
    try {
      const countsByDate = this._graphService.getLogsOfUsers();

      const dates = Object.keys(countsByDate).sort();
      const data = dates.map((date) => countsByDate[date]);

      this.chart = new Chart(this.canvas.nativeElement, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: data,
              label: title,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Cantidad de logs por día',
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async exportAsPDF() {
    let content = document.getElementsByTagName('canvas')[0]!;

    let title = this._pdfService.returnNameOfTypeGraph(this.type!);

    if (!content) {
      return;
    }
    await this._pdfService.generatePDF(content, title);
    console.log(content);
  }

  onHideSpinner() {
    this.onHideEmmitter.emit(false);
  }
}
