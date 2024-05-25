import { createAction, props } from '@ngrx/store';
import { Ticket, UpdateStatus } from '../models/ticket-admin';

// Actions triggering backend requests
export const getAllTicketRequest = createAction('[Ticket] Get All Tickets Request', props<{orgId: string}>());
export const updateTicketStatusRequest = createAction('[Ticket] Update Ticket Request', props<{updatedStatus: UpdateStatus}>());

// Success actions
export const getAllTicketSuccess = createAction('[Ticket Admin] Get All Tickets Success', props<{allTickets: Ticket[]}>());
export const updateTicketStatusSuccess = createAction('[Ticket Admin] Update Ticket Status Success', props<{ticket: Ticket}>());

// Failure actions
export const getAllTicketFailure = createAction('[Ticket Admin] Get All Tickets Failure', props<{errorMessage: string}>());
export const updateTicketStatusFailure = createAction('[Ticket Admin] Update Ticket Status Failure', props<{errorMessage: string}>());

//loading
export const setLoading = createAction('[Ticket Admin] set loading')
export const resetLoading = createAction('[Ticket Admin] reset loading')
