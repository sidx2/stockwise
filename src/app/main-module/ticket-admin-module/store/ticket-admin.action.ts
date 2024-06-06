import { createAction, props } from '@ngrx/store';
import { Ticket, UpdateStatus } from '../models/ticket-admin';

export const getAllTicketRequest = createAction('[Ticket] Get All Tickets Request');
export const getAllTicketSuccess = createAction('[Ticket Admin] Get All Tickets Success', props<{allTickets: Ticket[]}>());
export const getAllTicketFailure = createAction('[Ticket Admin] Get All Tickets Failure', props<{errorMessage: string}>());

export const updateTicketStatusRequest = createAction('[Ticket] Update Ticket Request', props<{updatedStatus: UpdateStatus}>());
export const updateTicketStatusSuccess = createAction('[Ticket Admin] Update Ticket Status Success', props<{ticket: Ticket}>());
export const updateTicketStatusFailure = createAction('[Ticket Admin] Update Ticket Status Failure', props<{errorMessage: string}>());

//loading
export const setLoading = createAction('[Ticket Admin] set loading')

// error
export const clearErrorMessage = createAction('[Ticket Admin] clear error message');
