import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class SwitchTitleDirective implements AfterViewInit {
  @Input('appHover') hoverText!: string;
  private originalText!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.originalText = this.el.nativeElement.innerText;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'flip-scale-up-hor');
    this.el.nativeElement.innerText = this.hoverText;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'flip-scale-up-hor');
    this.el.nativeElement.innerText = this.originalText;
  }

}
