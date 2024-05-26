import { createReducer, on } from '@ngrx/store';
import {TicketAdminState } from '../models/ticket-admin';
import { clearErrorMessage, getAllTicketFailure, getAllTicketSuccess, setLoading, updateTicketStatusFailure, updateTicketStatusSuccess } from './ticket-admin.action';
import { logoutUserSuccess } from '../../../store/global.actions';

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

    on(updateTicketStatusSuccess, (state, { ticket }) => ({
        ...state,
        allTickets: state.allTickets.map(t => t._id === ticket._id ? ticket : t),
        loading: false
    })),

    on(updateTicketStatusFailure, (state, {errorMessage})=>({
        ...state,
        loading: false,
        errorMessage
    })),
    
    on(setLoading, (state)=> ({...state, loading: true})),
    on(clearErrorMessage, (state)=> ({...state, errorMessage: ''})),
    on(logoutUserSuccess, ()=>  initialState)
);
