import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TypeOfGraph } from 'src/app/enums/typeOfGraph';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  constructor() {}
  async generatePDF(elementToConvert: HTMLElement, title: string) {
    const logo = new Image();
    logo.src = 'assets/icon/favicon.png';

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(logo, 'PNG', 10, 10, 30, 30);
    pdf.text(`${title}`, 105, 20, { align: 'center' });
    pdf.text('Clínica Online', 10, 45);

    if (elementToConvert instanceof HTMLTableElement) {
      const clonedTable = elementToConvert.cloneNode(true) as HTMLTableElement;
      Array.from(clonedTable.rows).forEach(row => {
        row.deleteCell(-1);
      });

      autoTable(pdf, { html: clonedTable, startY: 60 });
    } else {
      const canvas = await html2canvas(elementToConvert);
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = 60;
      const imgWidth = (imgProps.width * imgHeight) / imgProps.height;

      pdf.addImage(
        imgData,
        'PNG',
        (pdfWidth - imgWidth) / 2,
        70,
        imgWidth,
        imgHeight
      );
    }

    pdf.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 105, pdf.internal.pageSize.getHeight() - 20, { align: 'center' });

    pdf.save(`${title}.pdf`);
  }

  returnNameOfTypeGraph(typeOfGraph: TypeOfGraph) {
    switch (typeOfGraph) {
      case TypeOfGraph.shiftsBySpeciality:
        return 'Turnos por Especialidad.';
        break;
      case TypeOfGraph.finishedShiftInLapseOfTime:
        return 'Turnos finalizados en los 30 días.';
        break;
      case TypeOfGraph.shiftPerDay:
        return 'Turnos por día de la semana.';

        break;
      case TypeOfGraph.shiftInLapseOfTime:
        return 'Turnos en lapso de 30 días.';
        break;
      case TypeOfGraph.logsOfUser:
        return 'Ingreso de usuarios al sisitema';
        break;
    }
  }
}
