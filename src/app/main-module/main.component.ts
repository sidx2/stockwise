import { Component } from '@angular/core';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLoggedIn
  constructor(
    private cookieService: CookieService,
  ) {
    this.isLoggedIn = Boolean(this.cookieService.get("isLoggedIn")!)
    console.log("isLoggedIn in main component: ", this.isLoggedIn);
  }
}
