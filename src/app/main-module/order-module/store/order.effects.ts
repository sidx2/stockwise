import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { getProductVendorsFailure, getProductVendorsRequest, getProductVendorsSuccess, placeOrderFailure, placeOrderRequest, placeOrderSuccess } from "./order.actions";
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
            switchMap(() =>
                this.orderService$.getProductVendors().pipe(
                    map((res: any) => {
                        return getProductVendorsSuccess({ productVendors: res });
                    }),
                    catchError((err) =>{
                        const error = err?.error?.error || "Something went wrong";
                        return of(getProductVendorsFailure({ error }));
                    })
                )
            )
        )
    )

    placeOrder$ = createEffect(() =>
        this.action$.pipe(
            ofType(placeOrderRequest),
            switchMap(({ order }) =>
                this.orderService$.placeOrder(order).pipe(
                    map((res: any) => {
                        this.toastr.success("Order placed successfully!");
                        return placeOrderSuccess(res);
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        this.toastr.error(`Could not place order. ${error}`);
                        return of(placeOrderFailure({ error }))
                    })
                )
            )
        )
    )
}