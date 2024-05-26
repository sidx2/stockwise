import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchOrg, fetchOrgSuccess, loginUser, loginUserSuccess, setOrg, setUser } from '../../../../store/global.actions';
import { Actions, ofType } from "@ngrx/effects";
import { Router } from "@angular/router"
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGlobalState } from '../../../../models/global';
import { IAuthState, LoginCredentials } from '../../../models/auth';
import { authStateSelector } from '../../../store/auth.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  destroySubject = new Subject<void>();

  isLoading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private store: Store<{ global: IGlobalState, auth: IAuthState }>,
    private router: Router,
    private cookieService: CookieService,
    private actions$: Actions,
  ) {

    this.store.select(authStateSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((authState) => {
      this.isLoading = authState.isLoading;
    })

    this.actions$.pipe(
      ofType(loginUserSuccess),
      takeUntil(this.destroySubject)
      
    ).subscribe(({ user }) => {

      console.log("user in AuthComponent: ", user);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3); // Add 3 days

      // set cookies
      this.cookieService.set("token", user.token!, expiryDate)
      this.cookieService.set("user", JSON.stringify(user), expiryDate)
      this.cookieService.set("isLoggedin", "true", expiryDate)

      this.store.dispatch(setUser({ user }))
      this.store.dispatch(fetchOrg({ userId: user._id }))
    });

    this.actions$.pipe(
      ofType(fetchOrgSuccess),
      takeUntil(this.destroySubject)
    ).subscribe(({ org }) => {
      this.cookieService.set("org", JSON.stringify(org))
      this.store.dispatch(setOrg({ org: org }));

      this.router.navigate(['dashboard']);
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('email')) {
      return 'Invalid email address.';
    }
    if (control?.hasError('minlength')) {
      return `Must be at least ${control.getError('minlength').requiredLength} characters long.`;
    }

    return '';
  }

  onFormSubmit() {
    console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      alert("Invalid credentials");
      return;
    };

    const credentials: LoginCredentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    }

    this.store.dispatch(loginUser({ credentials }));
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}