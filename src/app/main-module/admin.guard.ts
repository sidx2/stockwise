import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const userString = this.cookieService.get('user');
    const user = JSON.parse(userString);
    if (user && user.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/landingPage']);
      return false;
    }
  }
}
