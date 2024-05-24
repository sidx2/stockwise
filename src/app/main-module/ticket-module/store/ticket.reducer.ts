import { createReducer, on } from '@ngrx/store';
import { Ticket } from '../models/ticket.model';
import { addTicket, setUserTickets, setAllTickets, updateTicket } from './ticket.action';

export interface TicketState {
    userTickets: Ticket[];
}

export const initialState: TicketState = {
    userTickets: [],
};

export const ticketReducer = createReducer(
    initialState,

    on(setUserTickets, (state, { userTickets }) => {
        console.log("User tickets are fetched successfully.");
        return { ...state, userTickets: userTickets };
    }),

    on(addTicket, (state, { ticket }) => {
        return { ...state, userTickets: [...state.userTickets, ticket] };
    }),

);
