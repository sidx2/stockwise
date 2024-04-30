import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appButtonPrimary]'
})
export class ButtonPrimaryDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // Apply the provided styling to the element
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.elementRef.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.elementRef.nativeElement, 'padding', '0.3rem 1rem');
    this.renderer.setStyle(this.elementRef.nativeElement, 'border-radius', '0.2rem');
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#0183ff');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '1rem');
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
    
    // Additional styling: Red background color
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
  }

}
