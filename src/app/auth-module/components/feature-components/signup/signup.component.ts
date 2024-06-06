import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createOrgRequest, createOrgSuccess, signupRequest, signupSuccess } from '../../../store/auth.actions';
import { Subject, takeUntil } from 'rxjs';
import { IAuthState } from '../../../models/auth';
import { customValidators } from '../../../../shared-module/validators/customValidators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../../../services/cookie.service';

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
      takeUntil(this.destroySubject),
    ).subscribe((data) => {
      console.log("data in signup: ", data);

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3); // Add 3 days
      this.cookieService.set("token", data.user.token!, 3)
      this.cookieService.set("user", JSON.stringify(data.user), 3)
      this.cookieService.set("isLoggedIn", "true", 3)

      const org = {
        name: this.signupForm.value.orgName!,
        email: this.signupForm.value.email!,
      }

      this.cookieService.set("user", JSON.stringify(data.user), 3);
      this.store.dispatch(createOrgRequest({ org, token: this.cookieService.get("token")! }))

    });

    this.actions$.pipe(
      ofType(createOrgSuccess),
      takeUntil(this.destroySubject),
    ).subscribe((data) => {
      this.cookieService.set("org", JSON.stringify(data.org), 3)
      this.router.navigate(['dashboard']);
    });
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
