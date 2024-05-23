import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router)
    const token = cookieService.get("token");
    console.log("Token in authGuard: ", token);
    if (token) return true;
    else {
      router.navigate(["/login"])
      return false;
    }
};
