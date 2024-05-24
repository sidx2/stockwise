import { createReducer, on } from '@ngrx/store';
import { Ticket } from '../models/ticket-admin';
import { setAllTickets, updateTicket } from './ticket-admin.action';
import { logoutUserSuccess } from '../../../store/global.actions';

export interface TicketAdminState {
    allTickets: Ticket[];
}

export const initialState: TicketAdminState = {
    allTickets: []
};

export const ticketAdminReducer = createReducer(
    initialState,

    on(setAllTickets, (state, { allTickets }) => {
        return { ...state, allTickets: allTickets };
    }),

    on(updateTicket, (state, { ticket }) => {
        const updatedAllTickets = state.allTickets.map(t =>
          t._id === ticket._id ? ticket : t
        );
        return { ...state, allTickets: updatedAllTickets};
    }),
    
    on(logoutUserSuccess, ()=>  initialState)
);
