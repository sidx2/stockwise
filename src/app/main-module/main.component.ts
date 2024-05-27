import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IGlobalState } from '../models/global';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  global$: Observable<IGlobalState>;

  constructor(private store: Store<{ global: IGlobalState}>){
    this.global$ = this.store.select('global');
    
  }
}
