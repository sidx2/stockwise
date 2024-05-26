import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { OrderHistoryService } from "../services/order-history.service";
import { fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess, resetHistoryLoading, setHistoryLoading, updateStatusFailure, updateStatusRequest, updateStatusSuccess } from "./order-history.actions";
import { IHistoryState } from "../models/order-history";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class historyEffects {
    constructor(
        private action$: Actions,
        private historyService$: OrderHistoryService,
        private store: Store<{ history: IHistoryState }>,
        private toastr: ToastrService,
    ) { }

    fetchHistory$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchHistoryRequest),
            tap(() => { this.store.dispatch(setHistoryLoading()); }),
            switchMap(() =>
                this.historyService$.fetchHistory().pipe(
                    map((res: any) => {
                        console.log("res in history:", res);
                        this.store.dispatch(resetHistoryLoading());
                        return fetchHistorySuccess({ history: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetHistoryLoading());
                        const error = err.error.error || "Something went wrong";
                        return of(fetchHistoryFailure({ error }));
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
            this.historyService$.updateStatus(data.updatedStatus, data._id).pipe(
                map((res: any) => {
                    console.log("res in update status:", res);
                    this.store.dispatch(resetHistoryLoading());
                    this.toastr.success(`Order staus updated to ${data.updatedStatus}`)
                    return updateStatusSuccess({ _id: data._id, updatedStatus: data.updatedStatus });
                }),
                catchError((err) => {
                    this.store.dispatch(resetHistoryLoading());
                    const error = err.error.error || "Something went wrong";
                    return of(updateStatusFailure({ error }));
                })
            )
        )
    )
)
}