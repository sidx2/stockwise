import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardService } from '../services/dashboard.service';
import { getInventoryCountsFailure, getInventoryCountsRequest, getInventoryCountsSuccess, setLoading } from './dashboard.action';

@Injectable()
export class DashboardEffects {

    constructor(
        private actions$: Actions,
        private dashboardService: DashboardService,
        private store: Store
    ) { }

    loadInventoryItems$ = createEffect(() => this.actions$.pipe(
        ofType(getInventoryCountsRequest),
        tap(() => {
            console.log('Effect triggered for getInventoryCountsRequest');
            this.store.dispatch(setLoading());
        }),
        switchMap(() =>
            this.dashboardService.getInventoryCount().pipe(
                map(response => {
                    console.log('API response in effect:', response);
                    return getInventoryCountsSuccess({ inventoryCounts: response });
                }),
                catchError(errorResponse => {
                    console.log('API error in effect:', errorResponse);
                    return of(getInventoryCountsFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ));
}
