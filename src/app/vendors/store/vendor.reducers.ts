import { createReducer, on } from "@ngrx/store"
import { fetchVendors, fetchVendorsSuccess } from "./vendor.actions";

// Reducers for global module
export interface IVendorsState {
    vendors: any
}

export const initialState: IVendorsState = {
    vendors: []
}

export const vendorReducer = createReducer(
    initialState,
    on(fetchVendors, (state) => {
        console.log("fetchVendors:", "state: ", state);
        return (state);
    }),
    on(fetchVendorsSuccess, (state, action) => {
        console.log("fetchVendorsSuccess:", "state: ", state, "action ->", action);
        return ({...state, vendors: action.vendors});
    }),
)