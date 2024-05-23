import { createAction, props } from '@ngrx/store';
import { Ticket, UpdateStatus } from '../models/ticket.model';

// Actions triggering backend requests
export const getUserTicketRequest = createAction('[Ticket] Get User Tickets Request');
export const getAllTicketRequest = createAction('[Ticket] Get All Tickets Request', props<{orgId: string}>());
export const createTicketRequest = createAction('[Ticket] Create Ticket Request', props<{ticket: Ticket}>());
export const updateTicketStatusRequest = createAction('[Ticket] Update Ticket Request', props<{updatedStatus: UpdateStatus}>());

// Action manipulating state
export const setUserTickets = createAction('[Ticket] Set User Tickets', props<{userTickets: Ticket[]}>());
export const setAllTickets = createAction('[Ticket] Set All Tickets', props<{allTickets: Ticket[]}>());

export const addTicket = createAction('[Ticket] add Ticket', props<{ticket: Ticket}>());
export const updateTicket = createAction('[Ticket] update Ticket', props<{ticket: Ticket}>());

