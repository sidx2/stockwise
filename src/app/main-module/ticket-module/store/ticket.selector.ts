import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { TicketState } from '../models/ticket.model';

export const selectTicketState = createFeatureSelector<TicketState>('tickets');

export const ticketSelector = createSelector(
    selectTicketState,
    (state: TicketState) => state.userTickets
);

export const getLoading = createSelector(
    selectTicketState,
    (state: TicketState) => state.loading
);