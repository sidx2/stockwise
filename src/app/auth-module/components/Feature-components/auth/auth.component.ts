import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchOrg, fetchOrgSuccess, loginUser, loginUserSuccess, setOrg, setUser } from '../../../../store/global.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router"
import { CookieService } from 'ngx-cookie-service';
import { globalStateSelector } from '../../../../store/global.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IGlobalState } from '../../../../store/global.reducers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  actions$ = inject(Actions)
  router = inject(Router);
  cookieService = inject(CookieService)
  globalState!: IGlobalState
  destroySubject = new Subject<void>();

  constructor(private store: Store<{ global: IGlobalState }>, private actios$: Actions) {
    this.store.select(globalStateSelector).subscribe((data) => {
      this.globalState = data;
    })
    this.actions$.pipe(ofType(loginUserSuccess), takeUntil(this.destroySubject)).subscribe((data) => {
      console.log("data in AuthComponent: ", data);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3); // Add 3 days

      this.cookieService.set("token", data.token, expiryDate)
      this.cookieService.set("user", JSON.stringify(data), expiryDate)
      this.cookieService.set("isLoggedin", "true", expiryDate)

      this.store.dispatch(setUser({user: data}))
      this.store.dispatch(fetchOrg({id: data.id}))
    });
    
    this.actions$.pipe(
      ofType(fetchOrgSuccess),
      ).subscribe((org) => {
        this.cookieService.set("org", JSON.stringify(org))
      this.store.dispatch(setOrg({ org: org }));

      this.router.navigate(['dashboard']);
    });
  }

  handleFormSubmit(e: any) {
    console.log("event: ", e);
    this.store.dispatch(loginUser({user: e}));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroySubject.next();
    this.destroySubject.complete();
  }

}
