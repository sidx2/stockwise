import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (errorResponse.status === 404) {
          errorMessage = 'Resource not found';
        } else if (errorResponse.error && errorResponse.error.error) {
          errorMessage = errorResponse.error.error;
        }

        this.errorService.emmitError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
