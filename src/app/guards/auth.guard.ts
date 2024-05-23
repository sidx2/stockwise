import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router)
  const token = cookieService.get("token");
  
  if (token) return true;
  else {
    router.navigate(['auth']);
    return false;
  }
};
