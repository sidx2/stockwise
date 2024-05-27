import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
    constructor(private cookieService: CookieService, private router: Router) { }

    canActivate(): boolean {
        const token = this.cookieService.get('token');
        if (token) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}