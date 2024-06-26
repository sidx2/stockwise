import { createReducer, on } from '@ngrx/store';
import { TicketState } from '../models/ticket.model';
import { setLoading, getUserTicketSuccess, createTicketSuccess, getUserTicketFailure, createTicketFailure, clearErrorMessage } from './ticket.action';
import { logoutUserSuccess } from '../../../auth-module/store/auth.actions';

export const initialState: TicketState = {
    userTickets: [],
    loading: false,
    errorMessage: ''
};

export const ticketReducer = createReducer(
    initialState,

    on(getUserTicketSuccess, (state, { userTickets }) => {
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
    on(clearErrorMessage, (state)=> ({...state, errorMessage: ''})),
    on(logoutUserSuccess, ()=>  initialState)
);
