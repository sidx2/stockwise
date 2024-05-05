import { createReducer, on } from '@ngrx/store';
import { Ticket } from '../models/ticket.model';
import { addTicket, setUserTickets, setAllTickets, updateTicket } from './ticket.action';

export interface TicketState {
    userTickets: Ticket[];
    allTickets: Ticket[];
}

export const initialState: TicketState = {
    userTickets: [],
    allTickets: []
};

export const ticketReducer = createReducer(
    initialState,

    on(setUserTickets, (state, { userTickets }) => {
        console.log("User tickets are fetched successfully.");
        return { ...state, userTickets: userTickets };
    }),

    on(setAllTickets, (state, { allTickets }) => {
        console.log("All tickets are fetched successfully.");
        return { ...state, allTickets: allTickets };
    }),

    on(addTicket, (state, { ticket }) => {
        return { ...state, allTickets: [...state.allTickets, ticket] };
    }),

    on(updateTicket, (state, { ticket }) => {
        const updatedAllTickets = state.allTickets.map(t =>
          t._id === ticket._id ? ticket : t
        );
        const updatedUserTickets = state.userTickets.map(t =>
          t._id === ticket._id ? ticket : t
        );
        return { ...state, allTickets: updatedAllTickets, userTickets: updatedUserTickets };
      }),
);
