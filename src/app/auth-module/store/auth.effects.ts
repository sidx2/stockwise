import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { createOrgFailre, createOrgRequest, createOrgSuccess, signupFailre, signupRequest, signupSuccess } from "./auth.actions";

@Injectable()
export class authEffects {
    action$ = inject(Actions)
    authService$ = inject(AuthService)

    constructor() { }

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
                        of(signupFailre({ error: "something fucked up! LoL!" }))
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
                        of(createOrgFailre({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )

}