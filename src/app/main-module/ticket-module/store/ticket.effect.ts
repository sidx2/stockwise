import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { addTicket, createTicketRequest, getUserTicketRequest, setUserTickets} from './ticket.action';

@Injectable()
export class TicketEffects {

    loadUserTicket$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTicketRequest),
        switchMap((action) =>
            this.ticketService.getUserTickets().pipe(
                map(response => setUserTickets({ userTickets: response })),
                catchError(error => {
                    console.error('Error in loading user tickets:', error);
                    return of();
                })
            )
        )
    ));

    createTicket$ = createEffect(() => this.actions$.pipe(
        ofType(createTicketRequest),
        switchMap((action) =>
            this.ticketService.createTicket(action.ticket).pipe(
                map(response => addTicket({ ticket: response })),
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