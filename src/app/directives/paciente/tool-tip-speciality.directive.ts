import { ContentChild, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class ToolTipSpecialityDirective {
  @Input('appTooltip') tooltipTitle!: string;
  @Input('buttonRef') button!: HTMLButtonElement;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.button.dataset['originalContent']) {
      this.button.dataset['originalContent'] = this.button.innerHTML;
      const imgElement: HTMLImageElement = this.button.querySelector('img')!;
      if (imgElement) {
        this.button.dataset['imageSrc'] = imgElement.src;
      }
    }
    this.button.innerHTML = this.tooltipTitle;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.button.innerHTML = this.button.dataset['originalContent']!;
    const imgElement: HTMLImageElement = this.button.querySelector('img')!;
    if (imgElement && this.button.dataset['imageSrc']) {
      imgElement.src = this.button.dataset['imageSrc'];
    }
  }

}
