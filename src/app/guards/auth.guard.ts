import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
    const token = cookieService.get("token");
    console.log("Token in authGuard: ", token);
    if (token) return false;
    else return true;
};
