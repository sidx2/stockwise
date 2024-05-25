import { createAction, props } from "@ngrx/store";
import { User } from "../../models/global";

export const signupRequest = createAction("signupRequest", props<{ user: any }>());
export const signupSuccess = createAction("signupSuccess", props<{ user: User }>());
export const signupFailre = createAction("signuptFailre", props<any>());

export const createOrgRequest = createAction("createOrgRequest", props<any>());
export const createOrgSuccess = createAction("createOrgSuccess", props<any>());
export const createOrgFailre = createAction("createOrgFailre", props<any>());