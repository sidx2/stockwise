import { createAction, props } from "@ngrx/store";
import { Vendor } from "../../vendors-module/store/vendor.reducers";
import { Order } from "../../order-history-module/models/order-history";
import { IPlaceOrder } from "../models/order";

export const getProductVendorsRequest = createAction("getProductVendorsRequest")
export const getProductVendorsSuccess = createAction("getProductVendorsSuccess", props<{ productVendors: Vendor[] }>())
export const getProductVendorsFailure = createAction("getProductVendorsFailure", props<{ error: string }>());

export const placeOrderRequest = createAction("placeOrderRequest", props<{ order: IPlaceOrder }>())
export const placeOrderSuccess = createAction("placeOrderSuccess", props<{ order: Order }>())
export const placeOrderFailure = createAction("placeOrderFailure", props<{ error: string }>())