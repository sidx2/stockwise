import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginUser, loginUserSuccess } from '../../store/global.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router"
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  actions$ = inject(Actions)
  router = inject(Router);
  cookieService = inject(CookieService)
  constructor(private store: Store<{ global: any }>) {
    this.actions$.pipe(
      ofType(loginUserSuccess),
    ).subscribe((data) => {
      console.log("data in AuthComponent: ", data);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3); // Add 3 days
      this.cookieService.set("token", data.token, expiryDate)
      this.router.navigate(['dashboard']);
    });
  }

  handleFormSubmit(e: any) {
    console.log("event: ", e);
    this.store.dispatch(loginUser(e));
  }

}
