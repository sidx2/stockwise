import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketAdminService } from '../services/ticket-admin.service';
import { getAllTicketRequest, updateTicketStatusRequest, setLoading, getAllTicketSuccess, getAllTicketFailure, updateTicketStatusSuccess, updateTicketStatusFailure } from './ticket-admin.action';
import { Store } from '@ngrx/store';


@Injectable()
export class TicketAdminEffects {

    loadAllTicket$ = createEffect(() => this.actions$.pipe(
        ofType(getAllTicketRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketAdminService.getAllTickets(action.orgId).pipe( 
                map(response => getAllTicketSuccess({ allTickets: response })),
                catchError(errorResponse => {
                    return of(getAllTicketFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ));

    updateTicketStatus$ = createEffect(() => this.actions$.pipe(
        ofType(updateTicketStatusRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketAdminService.updateTicketStatus(action.updatedStatus).pipe(
                map(response => updateTicketStatusSuccess({ ticket: response })),
                catchError(errorResponse => {
                    return of(updateTicketStatusFailure({errorMessage: errorResponse.error.error})); 
                })
            )
        )
    ));
    
    constructor(
        private actions$: Actions,
        private ticketAdminService: TicketAdminService,
        private store: Store
    ) { }
}