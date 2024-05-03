import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, map, of, switchMap, tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Store } from "@ngrx/store";
import { VendorsService } from "../vendors.service";
import { fetchVendors, fetchVendorsFailure, fetchVendorsSuccess } from "./vendor.actions";

@Injectable()
export class vendorEffects {
    action$ = inject(Actions)
    vendorsService$ = inject(VendorsService)
    cs = inject(CookieService);
    store = inject(Store<{ global: any }>)

    constructor() {
        console.log("action$", this.action$)
    }
    fetchUsers$ = createEffect(() =>

        this.action$.pipe(
            ofType(fetchVendors),
            switchMap(() =>
                this.vendorsService$.fetchVendors().pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return fetchVendorsSuccess({vendors: res})
                    }),
                    catchError((err) =>
                        of(fetchVendorsFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )


}