import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, format: string): string {

    const date = new Date(value);
    const datePipe = new DatePipe('en-US');

    return datePipe.transform(date, format)!;
  }

}
