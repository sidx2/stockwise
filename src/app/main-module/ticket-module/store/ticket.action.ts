import { createAction, props } from '@ngrx/store';
import { Ticket } from '../models/ticket.model';

// Actions triggering backend requests
export const getUserTicketRequest = createAction('[Ticket] Get User Tickets Request');
export const createTicketRequest = createAction('[Ticket] Create Ticket Request', props<{ticket: Ticket}>());

// Success actions
export const getUserTicketSuccess = createAction('[Ticket] Get User Tickets Success', props<{userTickets: Ticket[]}>());
export const createTicketSuccess = createAction('[Ticket] Create Ticket Success', props<{ticket: Ticket}>());

// Failure actions
export const getUserTicketFailure = createAction('[Ticket] Get User Tickets Failure', props<{errorMessage: string}>());
export const createTicketFailure = createAction('[Ticket] Create Ticket Failure', props<{errorMessage: string}>());

//loading
export const setLoading = createAction('[Ticket] set loading')

// error
export const clearErrorMessage = createAction('[Ticket] clear error message');
