import { createReducer, on } from "@ngrx/store"
import { getUser, loginUser, loginUserFailure, loginUserSuccess, setUser } from "./global.actions"

// Reducers for global module
export interface IGlobalState {
    user: any,
    org: any,
    isLoggedIn: boolean
}

export const initialState: IGlobalState = {
    user: {},
    org: {},
    isLoggedIn: false
}

export const globalReducer = createReducer(
    initialState,
    on(getUser, (state) => {
        console.log("getUser:", "state: ", state);
        return state;
    }),
    on(setUser, (state, action) => {
        console.log("setUser:", "state: ", state, "action ->", action);
        return {...state, user: action.user}
    }),
    on(loginUser, (state, action) => {
        console.log("loginUser:", "state: ", state, "action ->", action);
        return (state);
    }),
    on(loginUserSuccess, (state, action) => {
        console.log("loginUserSuccess:", "state: ", state, "action ->", action);
        return ({...state, user: action.user})
    }),
    
    on(loginUserFailure, (state, action) => {
        console.log("loginUserFailure:", "state: ", state, "action ->", action);
        return state;
    })
)