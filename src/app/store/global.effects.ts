import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../auth-module/services/auth.service";
// import { changePasswordFailure, changePasswordRequest, changePasswordSuccess, fetchOrg, fetchOrgFailure, fetchOrgSuccess, loginUser, loginUserFailure, loginUserSuccess, } from "./global.actions";
import { Store } from "@ngrx/store";
// import { OrgService } from "../services/org.service";
import {setLoading as setAuthLoading, resetLoading as resetAuthLoading} from "../auth-module/store/auth.actions";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class globalEffectssss {
    constructor(
        private action$: Actions,
        private authService$: AuthService,
        // private orgService$: OrgService,
        // private store: Store<{ global: IGlobalState }>,
        private toastr: ToastrService,
    ) { }

    // loginUser$ = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(loginUser),
    //         tap(() => { this.store.dispatch(setAuthLoading()); }),
    //         switchMap(({ credentials }) =>
    //             this.authService$.login(credentials).pipe(
    //                 map((res: any) => {
    //                     this.store.dispatch(resetAuthLoading());
    //                     this.toastr.success("Welcome back!");
    //                     return loginUserSuccess({ user: res });
    //                 }),
    //                 catchError((err) => {
    //                     this.store.dispatch(resetAuthLoading());
    //                     const error = err?.error?.error || "Something went wrong";
    //                     this.toastr.error(`Failed to login. ${error}`);
    //                     return of(loginUserFailure({ error }))
    //                 }
    //                 )
    //             )
    //         )
    //     )
    // )

    // fetchOrg$ = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(fetchOrg),
    //         tap(() => { this.store.dispatch(setAuthLoading()); }),
    //         switchMap(({ userId }) => {
    //             return this.orgService$.getOrgByUserId(userId).pipe(
    //                 map((res: any) => {
    //                     this.store.dispatch(resetAuthLoading());
    //                     return fetchOrgSuccess({ org: res });
    //                 }),
    //                 catchError((err) => {
    //                     this.store.dispatch(resetAuthLoading());
    //                     const error = err?.error?.error || "Something went wrong";
    //                     return of(fetchOrgFailure({ error }));
    //                 }
    //                 )
    //             )
    //         })
    //     )
    // )

    // changePassword$ = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(changePasswordRequest),
    //         switchMap(({ newPassword }) =>
    //             this.authService$.changePassword(newPassword).pipe(
    //                 map(() => changePasswordSuccess()),
    //                 catchError(error => of(changePasswordFailure({ error })))
    //             )
    //         )
    //     )
    // )
}