import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProfilePhotoZoom]'
})
export class ProfilePhotoZoomDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.zoom('scale(1.1)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.zoom('scale(1)');
  }

  private zoom(action: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', action);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
  }

}
