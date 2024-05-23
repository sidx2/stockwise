import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error && error.error.error) {
          errorMessage = error.error.error; // Assuming the error message is sent as { error: "Error message" }
        } else if(error.status === 400 && error.error.message) {
            errorMessage = error.error.message;
        }
        else {
          errorMessage = `${error.status} - ${error.message}`;
        }
        this.errorService.emmitError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
