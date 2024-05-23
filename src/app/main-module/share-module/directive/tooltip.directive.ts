import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  private tooltipElement: HTMLDivElement;

  constructor(private elementRef: ElementRef) {
    this.tooltipElement =  document.createElement('div')
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.tooltipElement) {
      this.tooltipElement = document.createElement('div');
      this.tooltipElement.textContent = this.tooltipText;
      this.tooltipElement.classList.add('tooltip');

      // Apply styles directly
      const element = this.tooltipElement;
      element.style.position = 'absolute';
      element.style.backgroundColor = 'black';
      element.style.color = 'white';
      element.style.padding = '5px';
      element.style.borderRadius = '5px';
      element.style.zIndex = '9999';

      // Position relative to the button
      const buttonRect = this.elementRef.nativeElement.getBoundingClientRect();
      element.style.top = (buttonRect.bottom + 5) + 'px'; // Add some offset
      element.style.left = (buttonRect.left + (buttonRect.width / 2) - (element.clientWidth / 2)) + 'px';

      document.body.appendChild(this.tooltipElement);
    }
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
    }
  }
}
