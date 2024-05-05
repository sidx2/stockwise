import { createReducer, on } from "@ngrx/store";
import { getProductVendorsFailure, getProductVendorsRequest, getProductVendorsSuccess, placeOrderFailure, placeOrderRequest, placeOrderSuccess } from "./order.actions";

export interface IOrderState {
    productVendors: Array<any>
}

export const initialState: IOrderState = {
    productVendors: []
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
)