import { Component } from '@angular/core';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLoggedIn: boolean = false

  constructor(
    private cookieService: CookieService,
  ) {
    this.isLoggedIn = Boolean(this.cookieService.get("isLoggedIn")!)
  }
}
