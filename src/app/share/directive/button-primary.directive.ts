import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appButtonPrimary]'
})
export class ButtonPrimaryDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    // Apply the provided styling to the element
    element.style.border = 'none';
    element.style.outline = 'none';
    element.style.padding = '0.5rem 1rem';
    element.style.borderRadius = '0.2rem';
    element.style.backgroundColor = '#0183ff';
    element.style.color = 'white';
    element.style.fontSize = '1rem';
    element.style.cursor = 'pointer';
  }

}
