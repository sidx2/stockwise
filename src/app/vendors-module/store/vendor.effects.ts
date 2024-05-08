import { ChangeDetectorRef, Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, map, of, switchMap, tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Store } from "@ngrx/store";
import { VendorsService } from "../services/vendors.service";
import { fetchVendorsRequest, fetchVendorsFailure, fetchVendorsSuccess, updateVendorRequest, updateVendorSuccess, updateVendorFailure, deleteVendorRequest, deleteVendorSuccess, deleteVendorFailure, addVendorSuccess, addVendorFailure, addVendorRequest } from "./vendor.actions";
import { addEmployeeRequest } from "../../employees/store/employees.actions";

@Injectable()
export class vendorEffects {
    action$ = inject(Actions)
    vendorsService$ = inject(VendorsService)
    cs = inject(CookieService);
    store = inject(Store<{ global: any }>)

    constructor() {
        console.log("action$", this.action$)
    }

    fetchVendors$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchVendorsRequest),
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

    updateVendor$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateVendorRequest),
            switchMap((vendor) =>
                this.vendorsService$.updateVendor(vendor).pipe(
                    map((res: any) => {
                        console.log("updateVendor res:", res)
                        return updateVendorSuccess({ vendor: res })
                    }),
                    catchError((err) =>
                        of(updateVendorFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )

    deleteVendor$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteVendorRequest),
            switchMap((vendor) =>
                this.vendorsService$.deleteVendor(vendor).pipe(
                    map((res: any) => {
                        console.log("deleteVendor res:", res)
                        return deleteVendorSuccess({ vendor: res })
                    }),
                    catchError((err) =>
                        of(deleteVendorFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )

    addEmployee$ = createEffect(() =>
    this.action$.pipe(
        ofType(addVendorRequest),
        switchMap((data) =>
            this.vendorsService$.addVendor(data.vendor, data.orgId).pipe(
                map((res: any) => {
                    console.log("addEmp res:", res)
                    return addVendorSuccess({ vendor: res })
                }),
                catchError((err) =>
                    of(addVendorFailure({ error: "something fucked up! LoL!" }))
                )
            )
        )
    )
)
}