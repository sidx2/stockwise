import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { loginUser, loginUserFailure, loginUserSuccess } from "./global.actions";

@Injectable()
export class authEffect {
    action$ = inject(Actions)
    authService$ = inject(AuthService)
    constructor() {
        console.log("action$", this.action$)
    }
    loadProducts$ = createEffect(() =>

        this.action$.pipe(
            ofType(loginUser),
            switchMap((u) =>
                this.authService$.login(u).pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return loginUserSuccess(res)
                    }),
                    catchError((err) =>
                        of(loginUserFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )
}