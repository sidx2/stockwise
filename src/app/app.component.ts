import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  title = 'Stockwise-frontend';

  constructor(public loaderService:LoaderService,
    public errorService: ErrorService){
  }
}
