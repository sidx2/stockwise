import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { Subject, takeUntil, concatMap, timeout, catchError, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthState, LoginCredentials } from '../../../models/auth';
import { authStateSelector } from '../../../store/auth.selectors';
import { ToastrService } from 'ngx-toastr';
import { customValidators } from '../../../../shared-module/validators/customValidators';
import { CookieService } from '../../../../services/cookie.service';
import { fetchOrg, fetchOrgSuccess, loginUser, loginUserSuccess, fetchOrgFailure } from '../../../store/auth.actions';
import { User } from '../../../../models/global';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  destroySubject = new Subject<void>();

  isLoading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, customValidators.validEmail]),
    password: new FormControl("", [Validators.required, customValidators.strongPassword])
  });

  constructor(
    private store: Store<{ auth: IAuthState }>,
    private router: Router,
    private cookieService: CookieService,
    private actions$: Actions,
    private toastr: ToastrService,
  ) {
    this.store.select(authStateSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((authState) => {
      this.isLoading = authState.isLoading;
    });

    this.actions$.pipe(
      ofType(loginUserSuccess),
      concatMap(({ user }) => {
        this.setLoginCookies(user, 3);
        this.store.dispatch(fetchOrg({ userId: user._id }));

        return this.actions$.pipe(
          ofType(fetchOrgSuccess, fetchOrgFailure)
        );
      }),
      takeUntil(this.destroySubject)
    ).subscribe((action) => {
      if (action && action.type === fetchOrgSuccess.type) {
        const { org } = action;
        this.cookieService.set("org", JSON.stringify(org), 3);
        this.router.navigate(['dashboard']);
      }
    });
  }

  setLoginCookies(user: User, expiryInDays: number = 1) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryInDays);

    // Set cookies
    this.cookieService.set("token", user.token!, expiryInDays);
    this.cookieService.set("user", JSON.stringify(user), expiryInDays);
    this.cookieService.set("isLoggedIn", "true", expiryInDays);
  }
  
  onFormSubmit() {
    if (!this.loginForm.valid) {
      this.toastr.error("Invalid credentials for login");
      return;
    }

    const credentials: LoginCredentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.store.dispatch(loginUser({ credentials }));
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}