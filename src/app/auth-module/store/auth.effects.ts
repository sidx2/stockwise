import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { createOrgFailure, createOrgRequest, createOrgSuccess, resetLoading, setLoading, signupFailure, signupRequest, signupSuccess } from "./auth.actions";
import { Store } from "@ngrx/store";
import { IAuthState } from "../models/auth";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class authEffects {
    constructor(
        private action$: Actions,
        private authService$: AuthService,
        private store: Store<{ auth: IAuthState }>,
        private toastr: ToastrService,
    ) { }

    signupUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(signupRequest),
            tap(() => { this.store.dispatch(setLoading()); }),
            switchMap((data) =>
                this.authService$.signup(data.user).pipe(
                    map((res: any) => {
                        console.log("res in signup:", res);
                        this.store.dispatch(resetLoading());
                        this.toastr.success("Welcome to StockWise")
                        return signupSuccess({ user: res })
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetLoading());
                        console.log("err in signup failure:", err);
                        const error = err.error.error || err.error.message || "Something went wrong! Could not signup"
                        this.toastr.error(error);
                        return of(signupFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    createOrg$ = createEffect(() =>
        this.action$.pipe(
            ofType(createOrgRequest),
            tap(() => { this.store.dispatch(setLoading()); }),
            switchMap((data) =>
                this.authService$.createOrg(data.org, data.token).pipe(
                    map((res: any) => {
                        console.log("res in create org:", res);
                        this.store.dispatch(resetLoading());
                        this.toastr.success("Organization was created successfully")
                        return createOrgSuccess({ org: res })
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetLoading());
                        const error = err.error.error || err.error.message || "Something went wrong";
                        this.toastr.error(error);
                        return of(createOrgFailure({ error }))

                    })
                )
            )
        )
    )

}