import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGlobalState } from './store/global.reducers';
import { LoaderService } from './share-module/services/loader.service';
import { ErrorService } from './share-module/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  title = 'Stockwise-frontend';

  global$: Observable<IGlobalState> | null = null;

  constructor(private store: Store<{ global: any}>, public loaderService:LoaderService,
    public errorService: ErrorService){
    this.global$ = this.store.select('global')
  }
}
