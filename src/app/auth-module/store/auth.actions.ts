import { createAction, props } from "@ngrx/store";
import { Org, User } from "../../models/global";
import { CreateOrgCredentials, LoginCredentials, SignupCredentials } from "../models/auth";

export const loginUser = createAction("loginUser", props<{ credentials: LoginCredentials }>());
export const loginUserSuccess = createAction("loginUserSuccess", props<{ user: User }>());
export const loginUserFailure = createAction("loginUserFailure", props<{ error: string }>());

export const signupRequest = createAction("signupRequest", props<{ user: SignupCredentials }>());
export const signupSuccess = createAction("signupSuccess", props<{ user: User }>());
export const signupFailure = createAction("signupFailure", props<{ error: string }>());

export const createOrgRequest = createAction("createOrgRequest", props<{ org: CreateOrgCredentials, token: string }>());
export const createOrgSuccess = createAction("createOrgSuccess", props<{ org: Org }>());
export const createOrgFailure = createAction("createOrgFailure", props<{ error: string }>());

export const fetchOrg = createAction("fetchOrg", props<{ userId: string }>());
export const fetchOrgSuccess = createAction("fetchOrgSuccess", props<{ org: Org }>());
export const fetchOrgFailure = createAction("fetchOrgFailure", props<{ error: string }>());

export const changePasswordRequest = createAction('[Auth] Change Password Request', props<{ newPassword: string }>());
export const changePasswordSuccess = createAction('[Auth] Change Password Success');
export const changePasswordFailure = createAction('[Auth] Change Password Failure', props<{ error: string }>());

export const logoutUserSuccess = createAction('[auth] logout user success');

export const setLoading = createAction('setLoading');
export const resetLoading = createAction('resetLoading');