import { Injectable, } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { User } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) { }

  user!: User;
  canActivate(): boolean {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === "user") {
        console.log("cookieValue: ", cookieValue)
        if (cookieValue != "")
          this.user = JSON.parse(cookieValue);
      }
    }

    if (this.user.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/landingPage']);
      return false;
    }
  }
}
