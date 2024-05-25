import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketAdminService } from '../services/ticket-admin.service';
import { getAllTicketRequest, updateTicketStatusRequest, updateTicket, setAllTickets, setLoading, resetLoading } from './ticket-admin.action';
import { Store } from '@ngrx/store';

@Injectable()
export class TicketAdminEffects {

    loadAllTicket$ = createEffect(() => this.actions$.pipe(
        ofType(getAllTicketRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketAdminService.getAllTickets(action.orgId).pipe( 
                map(response => setAllTickets({ allTickets: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading())
                    console.error('Error in loading all tickets:', error);
                    return of();
                })
            )
        )
    ));

    updateTicketStatus$ = createEffect(() => this.actions$.pipe(
        ofType(updateTicketStatusRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketAdminService.updateTicketStatus(action.updatedStatus).pipe(
                map(response => updateTicket({ ticket: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading())
                    console.error('Error in updating ticket:', error);
                    return of(); 
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