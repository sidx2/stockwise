import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { createOrgFailure, createOrgRequest, createOrgSuccess, resetLoading, setLoading, signupFailure, signupRequest, signupSuccess } from "./auth.actions";
import { Store } from "@ngrx/store";
import { IAuthState } from "../models/auth";

@Injectable()
export class authEffects {
    constructor(
        private action$: Actions,
        private authService$: AuthService,
        private store: Store<{ auth: IAuthState }>,
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
                        return signupSuccess({ user: res })
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetLoading());
                        console.log("err in signup failure:", err);
                        return of(signupFailure({ error: err.error.error || err.error.message || "Something went wrong" }))
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
                        return createOrgSuccess({ org: res })
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetLoading());
                        return of(createOrgFailure({ error: err.error.error || err.error.message || "Something went wrong" }))

                    })
                )
            )
        )
    )

}