import { Directive, ElementRef, Input, HostListener, AfterViewInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appInputWitherror]'
})
export class InputWitherrorDirective implements AfterViewInit {

  @Input('appInputWitherror') controlName: string | null = null;
  private control: AbstractControl | null = null;

  constructor(private el: ElementRef, private formGroupDirective: FormGroupDirective) {
    this.applyInputStyles();
  }

  private applyInputStyles() {
    const element = this.el.nativeElement;
    element.style.padding = '0.5rem 1rem';
    element.style.outline = 'none';
    element.style.border = '1px solid #e4e3e3';
    element.style.borderRadius = '0.2rem';
    element.style.fontSize = '1rem';
    element.style.backgroundColor = 'white';
  }

  @HostListener('focus')
  onFocus() {
    this.el.nativeElement.style.borderColor = '#007bff';
  }

  @HostListener('blur')
  onBlur() {
    this.updateBorderStyle();
  }

  ngAfterViewInit() {
    this.control = this.formGroupDirective.control?.get(this.controlName || '');
    if (this.control) {
      this.updateBorderStyle(); // Call updateBorderStyle initially
      this.control.statusChanges.subscribe(() => {
        this.updateBorderStyle(); // Subscribe to status changes of the form control
      });
    }
  }

  private updateBorderStyle() {
    if (this.control && this.control.touched && this.control.invalid) {
      this.el.nativeElement.style.borderColor = 'red'; // Apply red border for invalid inputs
    } else {
      this.el.nativeElement.style.borderColor = ''; // Reset border color
    }
  }
}
