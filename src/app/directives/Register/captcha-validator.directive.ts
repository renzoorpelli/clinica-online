import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCaptchaValidator]'
})
export class CaptchaValidatorDirective implements OnInit {
  @Input('resultOfOperation') resultOfOperation!: boolean;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {


    if (this.resultOfOperation) {
      this.elementRef.nativeElement.disabled = false;
    } else {
      this.elementRef.nativeElement.disabled = true;
    }
  }
}
