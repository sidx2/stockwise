import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../auth-module/services/auth.service";
import { changePasswordFailure, changePasswordRequest, changePasswordSuccess, fetchOrg, fetchOrgFailure, fetchOrgSuccess, init, loginUser, loginUserFailure, loginUserSuccess, setOrg, setUser } from "./global.actions";
import { CookieService } from "ngx-cookie-service";
import { Store } from "@ngrx/store";
import { OrgService } from "../services/org.service";
import { IGlobalState } from "../models/global";
import {
    setLoading as setAuthLoading,
    resetLoading as resetAuthLoading
} from "../auth-module/store/auth.actions";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class globalEffects {
    constructor(
        private action$: Actions,
        private authService$: AuthService,
        private orgService$: OrgService,
        private cs: CookieService,
        private store: Store<{ global: IGlobalState }>,
        private toastr: ToastrService,
    ) { }

    loginUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(loginUser),
            tap(() => { this.store.dispatch(setAuthLoading()); }),
            switchMap(({ credentials }) =>
                this.authService$.login(credentials).pipe(
                    map((res: any) => {
                        console.log("res:", res);
                        this.store.dispatch(resetAuthLoading());
                        this.toastr.success("Welcome back!");
                        return loginUserSuccess({ user: res });
                    }),
                    catchError((err) => {
                        console.log("err login: ", err);
                        this.store.dispatch(resetAuthLoading());
                        const error = err.error.error || err.error.message || "Something went wrong";
                        this.toastr.success(`Failed to login. ${error}`);
                        return of(loginUserFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    fetchOrg$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchOrg),
            tap(() => { this.store.dispatch(setAuthLoading()); }),
            switchMap(({ userId }) => {
                return this.orgService$.getOrgByUserId(userId).pipe(
                    map((res: any) => {
                        console.log("res:", res);
                        this.store.dispatch(resetAuthLoading());
                        return fetchOrgSuccess({ org: res });
                    }),
                    catchError((err) => {
                        console.log("fetch org err: ", err);
                        this.store.dispatch(resetAuthLoading());
                        const error = err.error.error || err.error.message || "Something went wrong";
                        return of(fetchOrgFailure({ error }));
                    }
                    )
                )
            })
        )
    )

    startupEffect$ = createEffect(() =>
        this.action$.pipe(
            ofType(init),

            tap(() => {
                console.log('Application started!');
                const rawUser = this.cs.get("user")
                const rawOrg = this.cs.get("org")

                console.log("rawUser:", rawUser)
                console.log("rawOrg:", rawOrg)

                const user = JSON.parse(rawUser || "{}")
                const org = JSON.parse(rawOrg || "{}")

                console.log("user in init:", user)
                console.log("org in init:", org)
                console.log("user.id in init: ", user._id)

                try {
                    this.store.dispatch(setUser({ user: user }))
                    this.store.dispatch(setOrg({ org: org }));
                    this.store.dispatch(loginUserSuccess({ user }))
                }
                catch (e) {
                    console.log(e);
                }
            })
        ), { dispatch: false });

    orgEffect$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchOrgSuccess),

            tap((t) => {
                console.log("t in tap: ", t);
                try {
                    this.cs.set("org", JSON.stringify(t))
                }
                catch (e) {
                    console.log(e);
                }
            })
        ), { dispatch: false }
    );

    changePassword$ = createEffect(() =>
        this.action$.pipe(
            ofType(changePasswordRequest),
            switchMap(({ newPassword }) =>
                this.authService$.changePassword(newPassword).pipe(
                    map(() => changePasswordSuccess()),
                    catchError(error => of(changePasswordFailure({ error })))
                )
            )
        )
    )
}