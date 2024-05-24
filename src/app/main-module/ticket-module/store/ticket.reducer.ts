import { createReducer, on } from '@ngrx/store';
import { TicketState } from '../models/ticket.model';
import { addTicket, setUserTickets, setLoading } from './ticket.action';
import { logoutUserSuccess } from '../../../store/global.actions';

export const initialState: TicketState = {
    userTickets: [],
    loading: false
};

export const ticketReducer = createReducer(
    initialState,

    on(setUserTickets, (state, { userTickets }) => {
        console.log("User tickets are fetched successfully.");
        return { ...state, userTickets: userTickets, loading: false };
    }),

    on(addTicket, (state, { ticket }) => {
        return { ...state, userTickets: [...state.userTickets, ticket], loading: false};
    }),

    on(setLoading, (state)=> ({...state, loading: true})),
    on(logoutUserSuccess, ()=>  initialState)
);
