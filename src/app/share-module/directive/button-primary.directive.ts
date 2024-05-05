import { Directive, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appButtonPrimary]'
})
export class ButtonPrimaryDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    // Apply the default styles
    this.applyDefaultStyles();
  }

  private applyDefaultStyles() {
    const element = this.elementRef.nativeElement;
    element.style.border = 'none';
    element.style.outline = 'none';
    element.style.padding = '0.5rem 1rem';
    element.style.borderRadius = '0.2rem';
    element.style.backgroundColor = '#0183ff';
    element.style.color = 'white';
    element.style.fontSize = '1rem';
    element.style.cursor = 'pointer';
  }

  // Listen for changes to the disabled state and update styles accordingly
  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.elementRef.nativeElement.disabled ? '#bfbfbf' : '#0183ff';
  }

  @HostBinding('style.color')
  get color(): string {
    return this.elementRef.nativeElement.disabled ? '#666666' : 'white';
  }

  @HostBinding('style.cursor')
  get cursor(): string {
    return this.elementRef.nativeElement.disabled ? 'not-allowed' : 'pointer';
  }
}


