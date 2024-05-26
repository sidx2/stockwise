import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { createTicketFailure, createTicketRequest, createTicketSuccess, getUserTicketFailure, getUserTicketRequest, getUserTicketSuccess, setLoading} from './ticket.action';
import { Store } from '@ngrx/store';

@Injectable()
export class TicketEffects {

    loadUserTicket$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTicketRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketService.getUserTickets().pipe(
                map(response => getUserTicketSuccess({ userTickets: response })),
                catchError(errorResponse => {
                    return of(getUserTicketFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ));

    createTicket$ = createEffect(() => this.actions$.pipe(
        ofType(createTicketRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.ticketService.createTicket(action.ticket).pipe(
                map(response => createTicketSuccess({ ticket: response })),
                catchError(errorResponse => {
                    return of(createTicketFailure({errorMessage: errorResponse.error.error}));
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