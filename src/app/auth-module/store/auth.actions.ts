import { createAction, props } from "@ngrx/store";
import { User } from "../../models/global";
import { Org } from "../../store/global.reducers";
import { CreateOrgCredentials, SignupCredentials } from "../models/auth";

export const signupRequest = createAction("signupRequest", props<{ user: SignupCredentials }>());
export const signupSuccess = createAction("signupSuccess", props<{ user: User }>());
export const signupFailure = createAction("signupFailure", props<{ error: string }>());

export const createOrgRequest = createAction("createOrgRequest", props<{ org: CreateOrgCredentials, token: string }>());
export const createOrgSuccess = createAction("createOrgSuccess", props<{ org: Org }>());
export const createOrgFailure = createAction("createOrgFailure", props<{ error: string }>());