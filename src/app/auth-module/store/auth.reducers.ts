import { createReducer, on } from "@ngrx/store";
import { createOrgFailure, createOrgSuccess, resetLoading, setLoading, signupFailure, signupSuccess } from "./auth.actions";
import { Org, User } from "../../models/global";
import { IAuthState } from "../models/auth";

export const initialState: IAuthState = {
    user: {} as User,
    org: {} as Org,
    isLoading: false,
}

export const authReducer = createReducer(
    initialState,
    on(signupSuccess, (state, action) => {
        console.log("signupSuccess", "state: ", state, "action: ", action)
        return ({...state, user: action.user})
    }),
    on(signupFailure, (state, action) => {
        console.log("signupFailure", "state: ", state, "action: ", action)
        return (state);
    }),
    on(createOrgSuccess, (state, action) => {
        console.log("createOrgSuccess", "state: ", state, "action: ", action)
        return ({...state, org: action.org})
    }),
    on(createOrgFailure, (state, action) => {
        console.log("createOrgFailure", "state: ", state, "action: ", action)
        return (state);
    }),

    on(setLoading, (state) => {
        return ({ ...state, isLoading: true });
    }),
    on(resetLoading, (state) => {
        return ({...state, isLoading: false });
    })
)