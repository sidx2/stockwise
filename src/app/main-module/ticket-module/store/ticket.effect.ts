import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { addTicket, createTicketRequest, getUserTicketRequest, resetLoading, setLoading, setUserTickets} from './ticket.action';
import { Store } from '@ngrx/store';

@Injectable()
export class TicketEffects {

    loadUserTicket$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTicketRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketService.getUserTickets().pipe(
                map(response => setUserTickets({ userTickets: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading())
                    console.error('Error in loading user tickets:', error);
                    return of();
                })
            )
        )
    ));

    createTicket$ = createEffect(() => this.actions$.pipe(
        ofType(createTicketRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketService.createTicket(action.ticket).pipe(
                map(response => addTicket({ ticket: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading())
                    console.error('Error in creating ticket:', error);
                    return of();
                })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private ticketService: TicketService,
        private store: Store
    ) { }
}