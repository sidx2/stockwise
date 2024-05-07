import { createReducer, on } from "@ngrx/store"
import { fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess } from "./order-history.actions"


export interface IHistoryState {
    history: []
}

export const initialState: IHistoryState = {
    history: []
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
)