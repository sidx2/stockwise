import { createAction, props } from '@ngrx/store';
import { Ticket, UpdateStatus } from '../models/ticket-admin';

// Actions triggering backend requests
export const getAllTicketRequest = createAction('[Ticket] Get All Tickets Request', props<{orgId: string}>());
export const updateTicketStatusRequest = createAction('[Ticket] Update Ticket Request', props<{updatedStatus: UpdateStatus}>());

// Action manipulating state
export const setAllTickets = createAction('[Ticket Admin] Set All Tickets', props<{allTickets: Ticket[]}>());

export const updateTicket = createAction('[Ticket Admin] update Ticket', props<{ticket: Ticket}>());

//loading
export const setLoading = createAction('[Ticket Admin] set loading')
