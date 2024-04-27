import { createAction, props } from "@ngrx/store";

export const getUser = createAction("getUser");

export const setUser = createAction("setUser", props<any>());

export const loginUser = createAction("loginUser", props<any>());

export const loginUserSuccess = createAction("loginUserSuccess", props<any>());

export const loginUserFailure = createAction("loginUserFailure", props<any>());
