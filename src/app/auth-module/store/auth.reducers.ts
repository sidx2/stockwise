import { createReducer, on } from "@ngrx/store";
import { createOrgFailre, createOrgSuccess, signupFailre, signupSuccess } from "./auth.actions";

export interface IAuthState {
    user: any,
    org: any,
}

export const initialState: IAuthState = {
    user: {},
    org: {}
}

export const authReducer = createReducer(
    initialState,
    on(signupSuccess, (state, action) => {
        console.log("signuptSuccess", "state: ", state, "action: ", action)
        return ({...state, user: action.user})
    }),
    on(signupFailre, (state, action) => {
        console.log("signuptFailre", "state: ", state, "action: ", action)
        return (state);
    }),
    on(createOrgSuccess, (state, action) => {
        console.log("createOrgSuccess", "state: ", state, "action: ", action)
        return ({...state, org: action.org})
    }),
    on(createOrgFailre, (state, action) => {
        console.log("createOrgFailre", "state: ", state, "action: ", action)
        return (state);
    })
)