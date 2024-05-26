import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { TicketAdminState } from '../models/ticket-admin';

export const selectTicketAdminState = createFeatureSelector<TicketAdminState>('ticketsAdmin');

export const ticketSelector = createSelector(
    selectTicketAdminState,
    (state: TicketAdminState) => state.allTickets
);

export const getLoading = createSelector(
    selectTicketAdminState,
    (state: TicketAdminState) => state.loading
);

export const getErrorMessage = createSelector(
    selectTicketAdminState,
    (state: TicketAdminState) => state.errorMessage
);