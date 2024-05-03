import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading: boolean = false;

  constructor() { }

  show(): void {
    this.isLoading = true;
  }

  hide(): void {
    this.isLoading = false;
  }
}
