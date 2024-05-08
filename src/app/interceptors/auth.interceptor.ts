import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cs = inject(CookieService);
  const token = cs.get("token")
  if (token) {

    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })
    console.log("token in interceptor: ", token)
    return next(authReq)
  }
  return next(req);
};
