import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { OrderHistoryService } from "../services/order-history.service";
import { fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess, updateStatusFailure, updateStatusRequest, updateStatusSuccess } from "./order-history.actions";

@Injectable()
export class historyEffects {
    action$ = inject(Actions)
    historyService$ = inject(OrderHistoryService)

    constructor() { }

    fetchHistory$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchHistoryRequest),
            switchMap(({ orgId }) =>
                this.historyService$.fetchHistory(orgId).pipe(
                    map((res: any) => {
                        console.log("res in history:", res)
                        return fetchHistorySuccess({history: res})
                    }),
                    catchError((err) =>
                        of(fetchHistoryFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    updateStatus$ = createEffect(() =>
    this.action$.pipe(
        ofType(updateStatusRequest),
        switchMap((data) =>
            this.historyService$.markFulfilled(data.updatedStatus, data._id).pipe(
                map((res: any) => {
                    console.log("res in update status:", res)
                    return updateStatusSuccess({_id: data._id, updatedStatus: data.updatedStatus})
                }),
                catchError((err) =>
                    of(updateStatusFailure({ error: "Something went wrong" }))
                )
            )
        )
    )
)
}