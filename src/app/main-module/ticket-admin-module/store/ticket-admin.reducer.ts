import { createReducer, on } from '@ngrx/store';
import { Ticket, TicketAdminState } from '../models/ticket-admin';
import { getAllTicketFailure, getAllTicketSuccess, resetLoading, setLoading } from './ticket-admin.action';
import { logoutUserSuccess } from '../../../store/global.actions';
import { updateStatusFailure, updateStatusSuccess } from '../../order-history-module/store/order-history.actions';

export const initialState: TicketAdminState = {
    allTickets: [],
    loading: false,
    errorMessage: ''
};

export const ticketAdminReducer = createReducer(
    initialState,

    on(getAllTicketSuccess, (state, { allTickets }) => {
        return { ...state, allTickets: allTickets, loading: false };
    }),

    on(getAllTicketFailure, (state, {errorMessage})=>({
        ...state,
        loading: false,
        errorMessage
    })),

    on(updateStatusSuccess, (state, { ticket }) => ({
        ...state,
        allTickets: state.allTickets.map(t => t._id === ticket._id ? ticket : t),
        loading: false
    })),

    on(updateStatusFailure, (state, {errorMessage})=>({
        ...state,
        loading: false,
        errorMessage
    })),
    
    on(setLoading, (state)=> ({...state, loading: true})),
    on(logoutUserSuccess, ()=>  initialState)
);
