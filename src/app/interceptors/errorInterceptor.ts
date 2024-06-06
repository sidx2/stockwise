import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse instanceof HttpErrorResponse) {
          let errorMessage = '';

          switch (errorResponse.status) {
            case 0:
              errorMessage = 'Backend is offline. Please try again later.';
              break;
              
            case 401:
              errorMessage = 'Unauthorized';
              break;

            case 403:
              errorMessage = 'Forbidden';
              break;

            case 500:
              errorMessage = 'Internal Server Error';
              break;
              
            default:
              errorMessage = 'An error occurred. Please try again later.';
              break;
          }

          this.toastr.error(errorMessage);
        }

        return throwError(errorResponse);
      })
    );
  }
}
