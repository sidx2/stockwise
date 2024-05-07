import { createAction, props } from "@ngrx/store";

export const getUser = createAction("getUser");

export const setUser = createAction("setUser", props<any>());

export const loginUser = createAction("loginUser", props<any>());

export const loginUserSuccess = createAction("loginUserSuccess", props<any>());

export const loginUserFailure = createAction("loginUserFailure", props<any>());

export const fetchOrg = createAction("fetchOrg", props<any>());

export const setOrg = createAction("setOrg", props<any>());

export const fetchOrgSuccess = createAction("fetchOrgSuccess", props<any>());

export const fetchOrgFailure = createAction("fetchOrgFailure", props<any>());

export const init = createAction("init");

export const clearState = createAction('[Global] Clear State');

