import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { VendorsService } from "../services/vendors.service";
import { fetchVendorsRequest, fetchVendorsFailure, fetchVendorsSuccess, updateVendorRequest, updateVendorSuccess, updateVendorFailure, deleteVendorRequest, deleteVendorSuccess, deleteVendorFailure, addVendorSuccess, addVendorFailure, addVendorRequest } from "./vendor.actions";

@Injectable()
export class vendorEffects {
    constructor(
        private action$: Actions,
        private vendorsService$: VendorsService,
    ) {}

    fetchVendors$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchVendorsRequest),
            switchMap(() =>
                this.vendorsService$.fetchVendors().pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return fetchVendorsSuccess({ vendors: res })
                    }),
                    catchError((err) =>
                        of(fetchVendorsFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    updateVendor$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateVendorRequest),
            switchMap(({ vendor }) =>
                this.vendorsService$.updateVendor(vendor).pipe(
                    map((res: any) => {
                        console.log("updateVendor res:", res)
                        // this.appService$.vendorUpdated(res)
                        return updateVendorSuccess({ vendor: res })
                    }),
                    catchError((err) =>
                        of(updateVendorFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    deleteVendor$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteVendorRequest),
            switchMap(({ vendorId }) =>
                this.vendorsService$.deleteVendor(vendorId).pipe(
                    map((res: any) => {
                        console.log("deleteVendor res:", res)
                        return deleteVendorSuccess({ vendor: res })
                    }),
                    catchError((err) =>
                        of(deleteVendorFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    addVendor$ = createEffect(() =>
    this.action$.pipe(
        ofType(addVendorRequest),
        switchMap((data) =>
            this.vendorsService$.addVendor(data.vendor, data.orgId).pipe(
                map((res: any) => {
                    console.log("addEmp res:", res)
                    return addVendorSuccess({ vendor: res })
                }),
                catchError((err) =>
                    of(addVendorFailure({ error: "Something went wrong" }))
                )
            )
        )
    )
)
}