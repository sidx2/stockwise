import { createReducer, on } from '@ngrx/store';
import { TicketState } from '../models/ticket.model';
import { setLoading, resetLoading, getUserTicketSuccess, createTicketSuccess, getUserTicketFailure, createTicketFailure } from './ticket.action';
import { logoutUserSuccess } from '../../../store/global.actions';

export const initialState: TicketState = {
    userTickets: [],
    loading: false,
    errorMessage: ''
};

export const ticketReducer = createReducer(
    initialState,

    on(getUserTicketSuccess, (state, { userTickets }) => {
        console.log("User tickets are fetched successfully.");
        return { ...state, userTickets: userTickets, loading: false };
    }),

    on(getUserTicketFailure, (state, {errorMessage})=>({
        ...state,
        errorMessage,
        loading: false
    })),

    on(createTicketSuccess, (state, { ticket }) => {
        return { ...state, userTickets: [...state.userTickets, ticket], loading: false};
    }),

    on(createTicketFailure, (state, {errorMessage})=>({
        ...state,
        errorMessage,
        loading: false
    })),

    on(setLoading, (state)=> ({...state, loading: true})),

    on(logoutUserSuccess, ()=>  initialState)
);
