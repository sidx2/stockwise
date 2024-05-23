import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IGlobalState } from '../../../store/global.reducers';
import { Store } from '@ngrx/store';
import { LoaderService } from '../../share-module/services/loader.service';
import { ErrorService } from '../../share-module/services/error.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  global$: Observable<IGlobalState> | null = null;

  constructor(private store: Store<{ global: IGlobalState}>, public loaderService:LoaderService,
    public errorService: ErrorService){
    this.global$ = this.store.select('global')
  }
}
