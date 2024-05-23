import { createAction, props } from "@ngrx/store";
import { create } from "domain";

export const getProductVendorsRequest = createAction("getProductVendorsRequest")

export const getProductVendorsSuccess = createAction("getProductVendorsSuccess", props<any>())

export const getProductVendorsFailure = createAction("getProductVendorsFailure", props<any>());

export const placeOrderRequest = createAction("placeOrderRequest", props<any>())

export const placeOrderSuccess = createAction("placeOrderSuccess", props<any>())

export const placeOrderFailure = createAction("placeOrderFailure", props<any>())