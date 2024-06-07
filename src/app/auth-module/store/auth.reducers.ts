import { createReducer, on } from "@ngrx/store";
import { IAuthState } from "../models/auth";
import { changePasswordFailure, changePasswordRequest, changePasswordSuccess, createOrgFailure, createOrgRequest, createOrgSuccess, fetchOrg, fetchOrgFailure, fetchOrgSuccess, loginUser, loginUserFailure, loginUserSuccess, signupFailure, signupRequest, signupSuccess } from "./auth.actions";

export const initialState: IAuthState = {
    isLoading: false,
}

export const authReducer = createReducer(
    initialState,

    // login user
    on(loginUser, (state, action) => {
        return ({...state, isLoading: true})
    }),
    on(loginUserSuccess, (state, action) => {
        return ({...state, isLoading: false})
    }),
    on(loginUserFailure, (state, action) => {
        return ({...state, isLoading: false})
    }),
    
    // signup
    on(signupRequest, (state) => {
        return ({...state, isLoading: true})
    }),
    on(signupSuccess, (state) => {
        return ({...state, isLoading: false})
    }),
    on(signupFailure, (state) => {
        return ({...state, isLoading: false})
    }),  
    
    // create org
    on(createOrgRequest, (state) => {
        return ({...state, isLoading: true})
    }),
    on(createOrgSuccess, (state) => {
        return ({...state, isLoading: false})
    }),
    on(createOrgFailure, (state) => {
        return ({...state, isLoading: false})
    }),

    // fetch org
    on(fetchOrg, (state) => {
        return ({...state, isLoading: true})
    }),
    on(fetchOrgSuccess, (state) => {
        return ({...state, isLoading: false})
    }),
    on(fetchOrgFailure, (state) => {
        return ({...state, isLoading: false})
    }),  
    
    // change password
    on(changePasswordRequest, (state) => {
        return ({...state, isLoading: true})
    }),
    on(changePasswordSuccess, (state) => {
        return ({...state, isLoading: false})
    }),
    on(changePasswordFailure, (state) => {
        return ({...state, isLoading: false})
    }),    
)