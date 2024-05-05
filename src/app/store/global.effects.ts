import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { fetchOrg, fetchOrgFailure, fetchOrgSuccess, init, loginUser, loginUserFailure, loginUserSuccess, setOrg, setUser } from "./global.actions";
import { CookieService } from "ngx-cookie-service";
import { Store } from "@ngrx/store";
import { OrgService } from "../org.service";
import { InventoryState } from "../inventory-module/store/inventory.reducer";
import { getItemRequest } from "../inventory-module/store/inventory.action";

@Injectable()
export class globalEffects {
    action$ = inject(Actions)
    authService$ = inject(AuthService)
    orgService$ = inject(OrgService)
    cs = inject(CookieService);
    store = inject(Store<{ global: any, inventory: InventoryState }>)

    constructor() {
        console.log("action$", this.action$)
    }
    loginUser$ = createEffect(() =>

        this.action$.pipe(
            ofType(loginUser),
            switchMap((u) =>
                this.authService$.login(u.user).pipe(
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

    fetchOrg$ = createEffect(() =>

        this.action$.pipe(
            ofType(fetchOrg),
            switchMap((u) => {
                console.log("u: ", u)
                return this.orgService$.getOrgByUserId(u.id).pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return fetchOrgSuccess(res)
                    }),
                    catchError((err) => {
                        console.log("err: ", err)
                        return of(fetchOrgFailure({ error: "something fucked up! LoL!" }))
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
                const rawUesr = this.cs.get("user")
                const rawOrg = this.cs.get("org")
                console.log("rawUser:", rawUesr)
                console.log("rawOrg:", rawOrg)
                const user = JSON.parse(rawUesr)
                const org = JSON.parse(rawOrg)
                console.log("user in init:", user)
                console.log("org in init:", org)
                console.log("user.id in init: ", user.id)
                try {
                    this.store.dispatch(setUser({ user: user }))
                    this.store.dispatch(setOrg({ org: org }));
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
        ), { dispatch: false });
}