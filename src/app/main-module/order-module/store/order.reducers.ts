import { createReducer, on } from "@ngrx/store";
import { getProductVendorsFailure, getProductVendorsRequest, getProductVendorsSuccess, placeOrderFailure, placeOrderRequest, placeOrderSuccess, resetOrderLoading, setOrderLoading } from "./order.actions";
import { IOrderState } from "../models/order";

export const initialState: IOrderState = {
    productVendors: [],
    isLoading: false,
}

export const orderReducer = createReducer(
    initialState,
    on(getProductVendorsRequest, (state) => {
        console.log("getProductVendorsRequest", "state: ", state)
        return (state);
    }),
    on(getProductVendorsSuccess, (state, action) => {
        console.log("getProductVendorsSuccess", "state: ", state, "action:", action)
        return ({...state, productVendors: action.productVendors})
        
    }),
    on(getProductVendorsFailure, (state, action) => {
        console.log("getProductVendorsFailure", "state: ", state, "action:", action)
        return (state);
        
    }),
    on(placeOrderRequest, (state, action) => {
        console.log("placeOrderRequest", "state: ", state, "action:", action)
        return (state);
    }),
    on(placeOrderSuccess, (state, action) => {
        console.log("placeOrderSuccess", "state: ", state, "action:", action)
        return (state);
    }),
    on(placeOrderFailure, (state, action) => {
        console.log("placeOrderFailure", "state: ", state, "action:", action)
        return (state);
    }),

    // loading...
    on(setOrderLoading, (state) => {
        console.log("setOrderLoading", "state:", state, "action: ", undefined)
        return ({ ...state, isLoading: true });
    }),
    on(resetOrderLoading, (state) => {
        console.log("resetOrderLoading", "state:", state, "action: ", undefined)
        return ({...state, isLoading: false });
    })
)