import { createReducer, on } from "@ngrx/store"
import { deleteOrderFailure, deleteOrderRequest, deleteOrderSuccess, fetchHistoryFailure, fetchHistoryRequest, fetchHistorySuccess, updateStatusFailure, updateStatusRequest, updateStatusSuccess } from "./order-history.actions"
import { IHistoryState, Order } from "../models/order-history";

export const initialState: IHistoryState = {
    history: [],
    isLoading: false
}

export const historyReducer = createReducer(
    initialState,
    on(fetchHistoryRequest, (state, action) => {
        return ({ ...state, isLoading: true });
    }),

    on(fetchHistorySuccess, (state, action) => {
        return ({...state, history: action.history, isLoading: false });
    }),
    
    on(fetchHistoryFailure, (state, action) => {
        return ({ ...state, isLoading: false});
    }),

    on(updateStatusRequest, (state, action) => {
        return ({ ...state, isLoading: true });
    }),

    on(updateStatusSuccess, (state, action) => {
        const newHistory = state.history.map((h: Order) => {
            if (h._id == action._id) { 
                return { ...h, status: action.updatedStatus };
            }
            return h;
        })

        return ({...state, history: newHistory, isLoading: false });
    }),

    on(updateStatusFailure, (state, action) => {
        return ({ ...state, isLoading: false });
    }),

    // delete
    on(deleteOrderRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),
    on(deleteOrderSuccess, (state, action) => {
        const newHistory = state.history.filter((h: Order) => h._id !== action.order._id.toString())
        return ({...state, history: newHistory, isLoading: false }); 
    }),
    on(deleteOrderFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),
)