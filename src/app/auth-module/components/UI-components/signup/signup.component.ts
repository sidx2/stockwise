import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { createOrgRequest, createOrgSuccess, signupRequest, signupSuccess } from '../../../store/auth.actions';
import { setOrg, setUser } from '../../../../store/global.actions';
import { IGlobalState } from '../../../../store/global.reducers';
import { IAuthState } from '../../../store/auth.reducers';
import { globalStateSelector } from '../../../../store/global.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @Output() myEv = new EventEmitter<any>();
  emitIt() {
    this.myEv.emit("hellowww")
  }

  actions$ = inject(Actions)
  router = inject(Router);
  globalState!: IGlobalState
  cookieService = inject(CookieService)
  
  signupForm = new FormGroup({
    orgName: new FormControl(""),
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private store: Store<{ global: IGlobalState, auth: IAuthState }>) {
    this.store.select(globalStateSelector).subscribe((data) => {
      this.globalState = data;
    })
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
      this.store.dispatch(setUser({user: data.user}))
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

  onFormSubmit() {
    // console.log("event: ", e);
    const user = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: "admin"
    }


    this.store.dispatch(signupRequest({ user }));
  }

}
