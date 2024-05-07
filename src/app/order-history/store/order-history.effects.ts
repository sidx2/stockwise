import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { OrderHistoryService } from "../order-history.service";
import { fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess } from "./order-history.actions";

@Injectable()
export class historyEffects {
    action$ = inject(Actions)
    historyService$ = inject(OrderHistoryService)

    constructor() { }

    fetchHistory$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchHistoryRequest),
            switchMap((data) =>
                this.historyService$.fetchHistory(data._id).pipe(
                    map((res: any) => {
                        console.log("res in history:", res)
                        return fetchHistorySuccess({history: res})
                    }),
                    catchError((err) =>
                        of(fetchHistoryFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )

}