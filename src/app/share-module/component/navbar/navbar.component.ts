import { state } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription} from 'rxjs';
import { IGlobalState } from '../../../store/global.reducers';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {

  globalState$ : Observable<IGlobalState>
  orgSubscription: Subscription | undefined = undefined;
  orgName: string = ''

  router = inject(Router)
  cs = inject(CookieService)

  constructor(private store: Store<{global: any}>){
    this.globalState$ = this.store.select('global');
  }

  ngOnInit(): void {
    this.orgSubscription = this.store.select('global').subscribe((global) => {
      this.orgName = global.org.name;
    })
  }

  onLogout() {
    this.cs.deleteAll();
    this.router.navigate(["login"])
  }
}
