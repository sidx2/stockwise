import { createAction, props } from "@ngrx/store";

export const signupRequest = createAction("signupRequest", props<any>());
export const signupSuccess = createAction("signuptSuccess", props<any>());
export const signupFailre = createAction("signuptFailre", props<any>());

export const createOrgRequest = createAction("createOrgRequest", props<any>());
export const createOrgSuccess = createAction("createOrgSuccess", props<any>());
export const createOrgFailre = createAction("createOrgFailre", props<any>());