import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const userString = cookieService.get("user");
  const user = JSON.parse(userString);
  if (user.role === 'admin'){
    return true;
  } 
  else {
    router.navigate(['landingPage']);
    return false;
  }
};
