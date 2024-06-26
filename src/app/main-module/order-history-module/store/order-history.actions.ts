import { createAction, props } from "@ngrx/store";
import { IStatusUpdated, Order } from "../models/order-history";

export const fetchHistoryRequest = createAction("fetchHistoryRequest");
export const fetchHistorySuccess = createAction("fetchHistorySuccess", props<{ history: Order[] }>());
export const fetchHistoryFailure = createAction("fetchHistoryFailure", props<{ error: string }>());

export const updateStatusRequest = createAction("updateStatusRequest", props<IStatusUpdated>());
export const updateStatusSuccess = createAction("updateStatusSuccess", props<IStatusUpdated>());
export const updateStatusFailure = createAction("updateStatusFailure", props<{ error: string }>());

export const deleteOrderRequest = createAction("deleteOrderRequest", props<{ _id: string }>());
export const deleteOrderSuccess = createAction("deleteOrderSuccess", props<{ order: Order }>());
export const deleteOrderFailure = createAction("deleteOrderFailure", props<{ error: string }>());