import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { orgSelector, userSelector } from '../store/global.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  router = inject(Router)
  cs = inject(CookieService)
  store = inject(Store<{ global: any }>)

  constructor() {
  }

  ngOnInit(): void {
    this.store.select(orgSelector).subscribe((org) => {
      console.log("org in dashboard is: ", org)
    })
  }

  onLogout() {
    this.cs.deleteAll();
    this.router.navigate([""])
  }
}
