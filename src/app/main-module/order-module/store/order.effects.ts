import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { getProductVendorsFailure, getProductVendorsRequest, getProductVendorsSuccess, placeOrderFailure, placeOrderRequest, placeOrderSuccess, resetOrderLoading, setOrderLoading } from "./order.actions";
import { OrderService } from "../services/order.service";
import { Store } from "@ngrx/store";
import { IOrderState } from "../models/order";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class orderEffects {
    constructor(
        private action$: Actions,
        private orderService$: OrderService,
        private store: Store<{ order: IOrderState }>,
        private toastr: ToastrService,
    ) { }

    getProductVendors$ = createEffect(() =>
        this.action$.pipe(
            ofType(getProductVendorsRequest),
            tap(() => { this.store.dispatch(setOrderLoading()); }),
            switchMap(() =>
                this.orderService$.getProductVendors().pipe(
                    map((res: any) => {
                        console.log("res productvedors:", res);
                        this.store.dispatch(resetOrderLoading());
                        return getProductVendorsSuccess({ productVendors: res });
                    }),
                    catchError((err) =>{
                        this.store.dispatch(resetOrderLoading());
                        const error = err.error.error || err.error.message || "Something went wrong";
                        return of(getProductVendorsFailure({ error }));
                    })
                )
            )
        )
    )

    placeOrder$ = createEffect(() =>
        this.action$.pipe(
            ofType(placeOrderRequest),
            tap(() => { this.store.dispatch(setOrderLoading()); }),
            switchMap(({ order }) =>
                this.orderService$.placeOrder(order).pipe(
                    map((res: any) => {
                        console.log("order res:", res);
                        this.store.dispatch(resetOrderLoading());
                        this.toastr.success("Order placed successfully!");
                        return placeOrderSuccess(res);
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetOrderLoading());
                        const error = err.error.error || err.error.message || "Something went wrong";
                        this.toastr.error(`Could not place order. ${error}`);
                        return of(placeOrderFailure({ error }))
                    })
                )
            )
        )
    )
}