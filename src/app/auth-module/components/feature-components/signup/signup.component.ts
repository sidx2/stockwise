import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { createOrgRequest, createOrgSuccess, signupRequest, signupSuccess } from '../../../store/auth.actions';
import { setOrg, setUser } from '../../../../store/global.actions';
import { IGlobalState } from '../../../../store/global.reducers';
import { IAuthState } from '../../../store/auth.reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    orgName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private store: Store<{ global: IGlobalState, auth: IAuthState }>,
    private router: Router,
    private cookieService: CookieService,
    private actions$: Actions,
  ) {
    this.actions$.pipe(
      ofType(signupSuccess),
    ).subscribe((data) => {
      console.log("data in signup: ", data);

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3); // Add 3 days
      this.cookieService.set("token", data.user.token, expiryDate)
      this.cookieService.set("user", JSON.stringify(data.user), expiryDate)
      this.cookieService.set("isLoggedin", "true", expiryDate)

      const org = {
        name: this.signupForm.value.orgName,
        email: this.signupForm.value.email,
      }

      this.store.dispatch(setUser({ user: data.user }))
      this.store.dispatch(createOrgRequest({ org, token: this.cookieService.get("token") }))
    });

    this.actions$.pipe(
      ofType(createOrgSuccess),
    ).subscribe((data) => {
      console.log("data in signup succes: ", data)
      this.cookieService.set("org", JSON.stringify(data.org))
      this.store.dispatch(setOrg({ org: data.org }));

      this.router.navigate(['dashboard']);
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Must be at least ${requiredLength} characters long.`;
    }

    return '';
  }

  onFormSubmit() {
    if (!this.signupForm.valid) {
      alert("Invalid credentials");
      return;
    }
    
    const user = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: "admin"
    }

    this.store.dispatch(signupRequest({ user }));
  }
}
