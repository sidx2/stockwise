import { createAction, props } from '@ngrx/store';
import { Ticket, UpdateStatus } from '../../ticket-module/models/ticket.model';

// Actions triggering backend requests
export const getAllTicketRequest = createAction('[Ticket] Get All Tickets Request', props<{orgId: string}>());
export const updateTicketStatusRequest = createAction('[Ticket] Update Ticket Request', props<{updatedStatus: UpdateStatus}>());

// Action manipulating state
export const setAllTickets = createAction('[Ticket] Set All Tickets', props<{allTickets: Ticket[]}>());

export const updateTicket = createAction('[Ticket] update Ticket', props<{ticket: Ticket}>());

