import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { VendorsService } from "../services/vendors.service";
import { fetchVendorsRequest, fetchVendorsFailure, fetchVendorsSuccess, updateVendorRequest, updateVendorSuccess, updateVendorFailure, deleteVendorRequest, deleteVendorSuccess, deleteVendorFailure, addVendorSuccess, addVendorFailure, addVendorRequest, setVendorLoading, resetVendorLoading } from "./vendor.actions";
import { Store } from "@ngrx/store";
import { IVendorsState } from "../models/vendor";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class vendorEffects {
    constructor(
        private action$: Actions,
        private vendorsService$: VendorsService,
        private store: Store<{ vendors: IVendorsState }>,
        private toastr: ToastrService,
    ) { }

    fetchVendors$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchVendorsRequest),
            tap(() => { this.store.dispatch(setVendorLoading()) }),
            switchMap(() =>
                this.vendorsService$.fetchVendors().pipe(
                    map((res: any) => {
                        console.log("res:", res);
                        this.store.dispatch(resetVendorLoading());
                        return fetchVendorsSuccess({ vendors: res })
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetVendorLoading());
                        const error = err?.error?.error || "Something went wrong";
                        return of(fetchVendorsFailure({ error }))
                    })
                )
            )
        )
    )

    updateVendor$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateVendorRequest),
            tap(() => { this.store.dispatch(setVendorLoading()) }),
            switchMap(({ vendor }) =>
                this.vendorsService$.updateVendor(vendor).pipe(
                    map((res: any) => {
                        console.log("updateVendor res:", res);
                        // this.appService$.vendorUpdated(res);
                        this.store.dispatch(resetVendorLoading());
                        this.toastr.success("vendor updated successfully!");
                        return updateVendorSuccess({ vendor: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetVendorLoading());
                        const error = err?.error?.error || "Something went wrong";
                        this.toastr.error(`Could not update vendor. ${error}`);
                        return of(updateVendorFailure({ error }))
                    })
                )
            )
        )
    )

    deleteVendor$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteVendorRequest),
            tap(() => { this.store.dispatch(setVendorLoading()) }),
            switchMap(({ vendorId }) =>
                this.vendorsService$.deleteVendor(vendorId).pipe(
                    map((res: any) => {
                        console.log("deleteVendor res:", res);
                        this.store.dispatch(resetVendorLoading());
                        this.toastr.success("Vendor deleted successfully!");
                        return deleteVendorSuccess({ vendor: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetVendorLoading());
                        const error = err?.error?.error || "Something went wrong";
                        this.toastr.error(`Could not delete Vendor. ${error}`);
                        return of(deleteVendorFailure({ error }))
                    })
                )
            )
        )
    )

    addVendor$ = createEffect(() =>
        this.action$.pipe(
            ofType(addVendorRequest),
            tap(() => { this.store.dispatch(setVendorLoading()) }),
            switchMap((data) =>
                this.vendorsService$.addVendor(data.vendor).pipe(
                    map((res: any) => {
                        console.log("addEmp res:", res);
                        this.store.dispatch(resetVendorLoading());
                        this.toastr.success("Vendor was added to the organization successfully!");
                        return addVendorSuccess({ vendor: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetVendorLoading());
                        const error = err?.error?.error || "Something went wrong";
                        this.toastr.error(`Could not add Vendor to the organization. ${error}`);
                        return of(addVendorFailure({ error }));
                    })
                )
            )
        )
    )
}