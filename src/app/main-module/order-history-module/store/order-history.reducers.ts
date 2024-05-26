import { createReducer, on } from "@ngrx/store"
import { fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess, resetHistoryLoading, setHistoryLoading, updateStatusFailure, updateStatusRequest, updateStatusSuccess } from "./order-history.actions"
import { IHistoryState, Order } from "../models/order-history";

export const initialState: IHistoryState = {
    history: [],
    isLoading: false
}

export const historyReducer = createReducer(
    initialState,
    on(fetchHistoryRequest, (state, action) => {
        console.log("fetchHistoryRequest", "state: ", state, "action:", action);
        return (state);
    }),
    on(fetchHistorySuccess, (state, action) => {
        console.log("fetchHistorySuccess", "state: ", state, "action:", action);
        return ({...state, history: action.history});
    }),
    on(fetchHistoryFailure, (state, action) => {
        console.log("fetchHistoryFailure", "state: ", state, "action:", action);
        return (state);
    }),

    on(updateStatusRequest, (state, action) => {
        console.log("updateStatusRequest", "state: ", state, "action:", action);
        return (state);
    }),
    on(updateStatusSuccess, (state, action) => {
        console.log("updateStatusSuccess", "state: ", state, "action:", action);
        action._id
        action.updatedStatus

        const newHistory = state.history.map((h: Order) => {
            if (h._id == action._id) { 
                return { ...h, status: action.updatedStatus }
            }
            return h
        })

        return ({...state, history: newHistory});
    }),
    on(updateStatusFailure, (state, action) => {
        console.log("updateStatusFailure", "state: ", state, "action:", action);
        return (state);
    }),

    // loading...
    on(setHistoryLoading, (state) => {
        console.log("setHistoryLoading", "state:", state, "action: ", undefined)
        return ({ ...state, isLoading: true });
    }),
    on(resetHistoryLoading, (state) => {
        console.log("resetHistoryLoading", "state:", state, "action: ", undefined)
        return ({...state, isLoading: false });
    })
)