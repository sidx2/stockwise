import { createReducer, on } from '@ngrx/store';
import { Ticket, TicketAdminState } from '../models/ticket-admin';
import { resetLoading, setAllTickets, setLoading, updateTicket } from './ticket-admin.action';
import { logoutUserSuccess } from '../../../store/global.actions';

export const initialState: TicketAdminState = {
    allTickets: [],
    loading: false
};

export const ticketAdminReducer = createReducer(
    initialState,

    on(setAllTickets, (state, { allTickets }) => {
        return { ...state, allTickets: allTickets, loading: false };
    }),

    on(updateTicket, (state, { ticket }) => ({
        ...state,
        allTickets: state.allTickets.map(t => t._id === ticket._id ? ticket : t),
        loading: false
    })),
    
    on(setLoading, (state)=> ({...state, loading: true})),
    on(resetLoading, (state)=> ({...state, loading: true})),

    on(logoutUserSuccess, ()=>  initialState)
);
