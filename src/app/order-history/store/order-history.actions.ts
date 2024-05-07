import { createAction, props } from "@ngrx/store";

export const fetchHistoryRequest = createAction("fetchHistoryRequest", props<any>());
export const fetchHistorySuccess = createAction("fetchHistorySuccess", props<any>());
export const fetchHistoryFailure = createAction("fetchHistoryFailure", props<any>());