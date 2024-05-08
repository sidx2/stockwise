import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { getProductVendorsFailure, getProductVendorsRequest, getProductVendorsSuccess, placeOrderFailure, placeOrderRequest, placeOrderSuccess } from "./order.actions";
import { OrderService } from "../components/services/order.service";

@Injectable()
export class orderEffects {
    action$ = inject(Actions)
    orderService$ = inject(OrderService)

    constructor() { }

    getProductVendors$ = createEffect(() =>
        this.action$.pipe(
            ofType(getProductVendorsRequest),
            switchMap((u) =>
                this.orderService$.getProductVendors().pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return getProductVendorsSuccess({productVendors: res})
                    }),
                    catchError((err) =>
                        of(getProductVendorsFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )

    placeOrder$ = createEffect(() =>
        this.action$.pipe(
            ofType(placeOrderRequest),
            switchMap((order) =>
                this.orderService$.placeOrder(order).pipe(
                    map((res: any) => {
                        console.log("order res:", res)
                        return placeOrderSuccess(res)
                    }),
                    catchError((err) =>
                        of(placeOrderFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )
}