import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { createOrgFailure, createOrgRequest, createOrgSuccess, signupFailure, signupRequest, signupSuccess } from "./auth.actions";

@Injectable()
export class authEffects {
    constructor(
        private action$: Actions,
        private authService$: AuthService,
    ) { }

    signupUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(signupRequest),
            switchMap((data) =>
                this.authService$.signup(data.user).pipe(
                    map((res: any) => {
                        console.log("res in signup:", res)
                        return signupSuccess({user: res})
                    }),
                    catchError((err) =>
                        of(signupFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    createOrg$ = createEffect(() =>
        this.action$.pipe(
            ofType(createOrgRequest), 
            switchMap((data) =>
                this.authService$.createOrg(data.org, data.token).pipe(
                    map((res: any) => {
                        console.log("res in create org:", res)
                        return createOrgSuccess({org: res})
                    }),
                    catchError((err) =>
                        of(createOrgFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

}