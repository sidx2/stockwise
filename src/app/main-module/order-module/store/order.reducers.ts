import { createReducer, on } from "@ngrx/store";
import { getProductVendorsFailure, getProductVendorsRequest, getProductVendorsSuccess, placeOrderFailure, placeOrderRequest, placeOrderSuccess } from "./order.actions";
import { IOrderState } from "../models/order";

export const initialState: IOrderState = {
    productVendors: [],
    isLoading: false,
}

export const orderReducer = createReducer(
    initialState,
    on(getProductVendorsRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),

    on(getProductVendorsSuccess, (state, action) => {
        return ({...state, productVendors: action.productVendors, isLoading: false })
    }),

    on(getProductVendorsFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),

    on(placeOrderRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),
    on(placeOrderSuccess, (state) => {
        return ({ ...state, isLoading: false });
    }),
    on(placeOrderFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),
)