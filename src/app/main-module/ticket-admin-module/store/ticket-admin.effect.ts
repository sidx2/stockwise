import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TicketAdminService } from '../services/ticket-admin.service';
import { getAllTicketRequest, updateTicketStatusRequest, updateTicket, setAllTickets } from './ticket-admin.action';

@Injectable()
export class TicketAdminEffects {

    loadAllTicket$ = createEffect(() => this.actions$.pipe(
        ofType(getAllTicketRequest),
        tap(() => console.log('getAllTicketsRequest dispatched')),
        mergeMap((action) =>
            this.ticketAdminService.getAllTickets(action.orgId).pipe( 
                map(response => setAllTickets({ allTickets: response })),
                tap(action => console.log('Dispatched action setAllTickets')),
                catchError(error => {
                    console.error('Error in loading all tickets:', error);
                    return of();
                })
            )
        )
    ));


    updateTicketStatus$ = createEffect(() => this.actions$.pipe(
        ofType(updateTicketStatusRequest),
        tap(() => console.log('updateTicketStatusRequest dispatched')),
        mergeMap((action) =>
            this.ticketAdminService.updateTicketStatus(action.updatedStatus).pipe(
                map(response => updateTicket({ ticket: response })),
                tap(action => console.log('Dispatched action updateTicket')),
                catchError(error => {
                    console.error('Error in updating ticket:', error);
                    return of(); 
                })
            )
        )
    ));
    
    

    constructor(
        private actions$: Actions,
        private ticketAdminService: TicketAdminService,
    ) { }
}