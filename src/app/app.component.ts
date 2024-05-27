import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { init } from './store/global.actions';
import { IGlobalState } from './models/global';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'Stockwise-frontend';

  constructor(
    private store: Store<{ global: IGlobalState }>,
    private cookieService: CookieService,
  ){}

  ngOnInit(): void {
    const rawUser = this.cookieService.get("user");
    const rawOrg = this.cookieService.get("org");

    const user = JSON.parse(rawUser || "{}");
    const org = JSON.parse(rawOrg || "{}");

    console.log("user and org while init: ", user, org);
    this.store.dispatch(init({ user, org }));
  }
}
