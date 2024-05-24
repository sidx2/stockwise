import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { addTicket, createTicketRequest, getUserTicketRequest, setUserTickets, getAllTicketRequest, updateTicketStatusRequest, updateTicket, setAllTickets } from './ticket.action';


@Injectable()
export class TicketEffects {

    loadUserTicket$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTicketRequest),
        tap(() => console.log('getUserTicketRequest dispatched')),
        mergeMap((action) =>
            this.ticketService.getUserTickets().pipe(
                map(response => setUserTickets({ userTickets: response })),
                tap(action => console.log('Dispatched action setUserTickets')),
                catchError(error => {
                    console.error('Error in loading user tickets:', error);
                    return of();
                })
            )
        )
    ));

    createTicket$ = createEffect(() => this.actions$.pipe(
        ofType(createTicketRequest),
        tap(() => console.log('createTicketRequest dispatched')),
        mergeMap((action) =>
            this.ticketService.createTicket(action.ticket).pipe(
                map(response => addTicket({ ticket: response })),
                tap(action => console.log('Dispatched action addTicket')),
                catchError(error => {
                    console.error('Error in creating ticket:', error);
                    return of();
                })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private ticketService: TicketService,
    ) { }
}