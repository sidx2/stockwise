import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createOrgFailure, createOrgRequest, createOrgSuccess, signupRequest, signupSuccess } from '../../../store/auth.actions';
import { Subject, concatMap, takeUntil } from 'rxjs';
import { IAuthState } from '../../../models/auth';
import { customValidators } from '../../../../shared-module/validators/customValidators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../../../services/cookie.service';
import { User } from '../../../../models/global';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy {
  signupForm = new FormGroup({
    orgName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, customValidators.validEmail]),
    password: new FormControl("", [Validators.required, customValidators.strongPassword])
  })

  destroySubject = new Subject<void>();

  constructor(
    private store: Store<{ auth: IAuthState }>,
    private router: Router,
    private cookieService: CookieService,
    private actions$: Actions,
    private toastr: ToastrService,
  ) {
    this.actions$.pipe(
      ofType(signupSuccess),
      concatMap(({ user }) => {
        this.setSignupCookies(user, 3);

        const org = {
          name: this.signupForm.value.orgName!,
          email: this.signupForm.value.email!,
        }

        this.store.dispatch(createOrgRequest({ org, token: this.cookieService.get("token")! }))

        return this.actions$.pipe(
          ofType(createOrgSuccess, createOrgFailure),
        );
      }),
      takeUntil(this.destroySubject),
    ).subscribe((data) => {
      if (data.type === createOrgSuccess.type) {
        const { org } = data;
        this.cookieService.set("org", JSON.stringify(org), 3)
        this.router.navigate(['dashboard']);
      }
    });
  }

  setSignupCookies(user: User, expiryInDays: number) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryInDays);

    this.cookieService.set("token", user.token!, expiryInDays)
    this.cookieService.set("user", JSON.stringify(user), expiryInDays)
    this.cookieService.set("isLoggedIn", "true", expiryInDays)
  }

  onFormSubmit() {
    if (!this.signupForm.valid) {
      this.toastr.error("Invalid credentials for signup")
      return;
    }

    const user = {
      name: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
      role: "admin"
    }

    this.store.dispatch(signupRequest({ user }));
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
