import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { OrderHistoryService } from "../services/order-history.service";
import { deleteOrderFailure, deleteOrderRequest, deleteOrderSuccess, fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess, updateStatusFailure, updateStatusRequest, updateStatusSuccess } from "./order-history.actions";
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
            switchMap(() =>
                this.historyService$.fetchHistory().pipe(
                    map((res: any) => {
                        return fetchHistorySuccess({ history: res });
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        return of(fetchHistoryFailure({ error }));
                    })
                )
            )
        )
    )

    updateStatus$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateStatusRequest),
            switchMap((data) =>
                this.historyService$.updateStatus(data.updatedStatus, data._id).pipe(
                    map((res: any) => {
                        this.toastr.success(`Order staus updated to ${data.updatedStatus}`)
                        return updateStatusSuccess({ _id: data._id, updatedStatus: data.updatedStatus });
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        return of(updateStatusFailure({ error }));
                    })
                )
            )
        )
    )

    deleteOrder$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteOrderRequest),
            switchMap(({ _id }) =>
                this.historyService$.deleteOrder(_id).pipe(
                    map((res: any) => {
                        this.toastr.success(`Order deleted successfully!`)
                        return deleteOrderSuccess({ order: res });
                    }),
                    catchError((err) => {
                        const error = err?.error?.error || "Something went wrong";
                        return of(deleteOrderFailure({ error }));
                    })
                )
            )
        )
    )
}