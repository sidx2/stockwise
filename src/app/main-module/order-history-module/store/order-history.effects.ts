import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { OrderHistoryService } from "../services/order-history.service";
import { fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess, resetHistoryLoading, setHistoryLoading, updateStatusFailure, updateStatusRequest, updateStatusSuccess } from "./order-history.actions";
import { IHistoryState } from "../models/order-history";
import { Store } from "@ngrx/store";

@Injectable()
export class historyEffects {
    constructor(
        private action$: Actions,
        private historyService$: OrderHistoryService,
        private store: Store<{ history: IHistoryState }>,
    ) { }

    fetchHistory$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchHistoryRequest),
            tap(() => { this.store.dispatch(setHistoryLoading()); }),
            switchMap(({ orgId }) =>
                this.historyService$.fetchHistory(orgId).pipe(
                    map((res: any) => {
                        console.log("res in history:", res);
                        this.store.dispatch(resetHistoryLoading());
                        return fetchHistorySuccess({ history: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetHistoryLoading());
                        return of(fetchHistoryFailure({ error: err.error.error || err.error.message || "Something went wrong" }));
                    })
                )
            )
        )
    )

    updateStatus$ = createEffect(() =>
    this.action$.pipe(
        ofType(updateStatusRequest),
        tap(() => { this.store.dispatch(setHistoryLoading()); }),
        switchMap((data) =>
            this.historyService$.markFulfilled(data.updatedStatus, data._id).pipe(
                map((res: any) => {
                    console.log("res in update status:", res);
                    this.store.dispatch(resetHistoryLoading());
                    return updateStatusSuccess({ _id: data._id, updatedStatus: data.updatedStatus });
                }),
                catchError((err) => {
                    this.store.dispatch(resetHistoryLoading());
                    return of(updateStatusFailure({ error: err.error.error || err.error.message || "Something went wrong" }));
                })
            )
        )
    )
)
}