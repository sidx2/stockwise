import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { changePasswordFailure, changePasswordRequest, changePasswordSuccess, createOrgFailure, createOrgRequest, createOrgSuccess, fetchOrg, fetchOrgFailure, fetchOrgSuccess, loginUser, loginUserFailure, loginUserSuccess, signupFailure, signupRequest, signupSuccess } from "./auth.actions";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class authEffects {
    constructor(
        private action$: Actions,
        private authService: AuthService,
        private toastr: ToastrService,
    ) { }

    loginUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(loginUser),
            switchMap(({ credentials }) =>
                this.authService.login(credentials).pipe(
                    map((res: any) => {
                        this.toastr.success("Welcome back!");
                        return loginUserSuccess({ user: res });
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        this.toastr.error(`Failed to login. ${error}`);
                        return of(loginUserFailure({ error }))
                    })
                )
            )
        )
    );

    signupUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(signupRequest),
            switchMap((data) =>
                this.authService.signup(data.user).pipe(
                    map((res: any) => {
                        this.toastr.success("Welcome to StockWise")
                        return signupSuccess({ user: res })
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong! Could not signup"
                        this.toastr.error(error);
                        return of(signupFailure({ error }))
                    })
                )
            )
        )
    );

    createOrg$ = createEffect(() =>
        this.action$.pipe(
            ofType(createOrgRequest),
            switchMap((data) =>
                this.authService.createOrg(data.org, data.token).pipe(
                    map((res: any) => {
                        this.toastr.success("Organization was created successfully")
                        return createOrgSuccess({ org: res })
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        this.toastr.error(error);
                        return of(createOrgFailure({ error }))

                    })
                )
            )
        )
    );

    fetchOrg$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchOrg),
            exhaustMap(() => 
                this.authService.getOrgByUserId().pipe(
                    map((res: any) => {
                        return fetchOrgSuccess({ org: res });
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        return of(fetchOrgFailure({ error }));
                    })
                )
            )
        )
    );

    changePassword$ = createEffect(() =>
        this.action$.pipe(
            ofType(changePasswordRequest),
            switchMap(({ currPassword, newPassword }) =>
                this.authService.changePassword(currPassword, newPassword).pipe(
                    map((res: any) => {
                        return changePasswordSuccess();
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        this.toastr.error(`Failed to change password. ${error}`);
                        return of(changePasswordFailure({ error }));
                    })
                )
            )
        )
    );

}