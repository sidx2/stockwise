import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const loggedOutGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router)

    const token = cookieService.get("token");
    console.log("Token in loggedOut: ", token);
    if (token)  {
      // router.navigate(["/dashboard"])
      return false;
    }
    else {
      return true;
    }
};
