import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import * as XLSX from 'xlsx'


@Injectable({
  providedIn: 'root',
})
export class ExcelService  {
  constructor(){

  }
  generateSpreadSheet(data:Usuario[], title:string){
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.map(({password, ...rest}) => rest));

    XLSX.utils.book_append_sheet(wb, ws, 'Hoja 1');

    XLSX.writeFile(wb, `${title}.xlsx`);
  }


}
