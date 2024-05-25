import { createAction, props } from '@ngrx/store';
import { Ticket } from '../models/ticket.model';

// Actions triggering backend requests
export const getUserTicketRequest = createAction('[Ticket] Get User Tickets Request');
export const createTicketRequest = createAction('[Ticket] Create Ticket Request', props<{ticket: Ticket}>());


// Action manipulating state
export const setUserTickets = createAction('[Ticket] Set User Tickets', props<{userTickets: Ticket[]}>());
export const setAllTickets = createAction('[Ticket] Set All Tickets', props<{allTickets: Ticket[]}>());

export const addTicket = createAction('[Ticket] add Ticket', props<{ticket: Ticket}>());


//loading
export const setLoading = createAction('[Ticket] set loading')
export const resetLoading = createAction('[Ticket] reset loading')