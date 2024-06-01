import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
    constructor(private cookieService: CookieService, private router: Router) {}
    
    
    canActivate(): boolean {
        let token;
    
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
    
        for (let cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName === "token") {
            token = cookieValue;
          }
        }

        if (token) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}