import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared-module/services/loader.service';
import { ErrorService } from './services/error.service';
import { Store } from '@ngrx/store';
import { IGlobalState } from './store/global.reducers';
import { init } from './store/global.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'Stockwise-frontend';

  constructor(public errorService: ErrorService,private store: Store<{global: IGlobalState}>){}

  ngOnInit(): void {
    this.store.dispatch(init())
  }
}
