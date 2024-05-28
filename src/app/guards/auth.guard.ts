import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) { }

  canActivate(): boolean {
    // const cookieString = document.cookie;
    // const cookies = cookieString.split('; ');

    // for (let cookie of cookies) {
    //   const [cookieName, cookieValue] = cookie.split('=');
    //   if (cookieName === name) {
    //     return cookieValue;
    //   }
    // }
    const token = String(this.cookieService.get("token"));
    if (token) {
      return true;
    } else {
      if (!token)
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
