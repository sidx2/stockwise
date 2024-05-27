import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';


function getCookieValue(name: string) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) { }

  canActivate(): boolean {
    // const token = this.cookieService.get('token');
    console.log("document.cookie:", document.cookie);
    console.log("token:", getCookieValue("token"));
    const token = getCookieValue("token");
    if (token) {
      return true;
    } else {
      if (!token)
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
