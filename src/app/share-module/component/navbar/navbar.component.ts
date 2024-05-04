import { state } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGlobalState } from '../../../store/global.reducers';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  globalState$ : Observable<IGlobalState>

  router = inject(Router)
  cs = inject(CookieService)

  constructor(private store: Store<{global: any}>){
    this.globalState$ = this.store.select('global');
  }

  onLogout() {
    this.cs.deleteAll();
    this.router.navigate(["login"])
  }
}
