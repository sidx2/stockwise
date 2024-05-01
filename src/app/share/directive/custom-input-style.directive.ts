import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomInputStyle]'
})
export class CustomInputStyleDirective {

  constructor(private el: ElementRef) {
    this.applyInputStyles();
  }

  private applyInputStyles() {
    const element = this.el.nativeElement;
    element.style.padding = '0.5rem 1rem';
    element.style.outline = 'none';
    element.style.border = '1px solid rgb(152, 152, 152)';
    element.style.borderRadius = '0.2rem';
    element.style.fontSize = '1rem';
    element.style.backgroundColor = 'white';

    if(element.type === 'checkbox') {
      element.style.transform = 'scale(1.5)';
      element.style.marginRight = '0.5rem';
    }
  }

  @HostListener('focus')
  onFocus() {
    this.el.nativeElement.style.borderColor = '#007bff';
  }

  @HostListener('blur')
  onBlur() {
    this.el.nativeElement.style.borderColor = 'rgb(152, 152, 152)';
  }
}