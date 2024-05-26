import { createAction, props } from "@ngrx/store";
import { LoginCredentials } from "../auth-module/models/auth";
import { Org, User } from "../models/global";

export const getUser = createAction("getUser");
export const setUser = createAction("setUser", props<{ user: User }>());

export const loginUser = createAction("loginUser", props<{ credentials: LoginCredentials }>());
export const loginUserSuccess = createAction("loginUserSuccess", props<{ user: User}>());
export const loginUserFailure = createAction("loginUserFailure", props<{ error: string }>());

export const setOrg = createAction("setOrg", props<{ org: Org }>());
export const fetchOrg = createAction("fetchOrg", props<{ userId: string }>());
export const fetchOrgSuccess = createAction("fetchOrgSuccess", props<{ org: Org }>());
export const fetchOrgFailure = createAction("fetchOrgFailure", props<{ error: string }>());

export const init = createAction("init");
export const changePasswordRequest = createAction('[Auth] Change Password Request', props<{ newPassword: string }>());
export const changePasswordSuccess = createAction('[Auth] Change Password Success');
export const changePasswordFailure = createAction('[Auth] Change Password Failure', props<{ error: any }>());

export const logoutUserSuccess = createAction('[auth] logout user success')

export const setLoading = createAction('setLoading');
export const resetLoading = createAction('resetLoading');