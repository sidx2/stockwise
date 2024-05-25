import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { TicketAdminState } from '../models/ticket-admin';

export const selectTicketState = createFeatureSelector<TicketAdminState>('ticketsAdmin');

export const ticketSelector = createSelector(
    selectTicketState,
    (state: TicketAdminState) => state.allTickets
);

export const getLoading = createSelector(
    selectTicketState,
    (state: TicketAdminState) => state.loading
);