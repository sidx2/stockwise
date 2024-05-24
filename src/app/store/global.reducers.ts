import { createReducer, on } from "@ngrx/store"
import { fetchOrg, fetchOrgSuccess, getUser, loginUser, loginUserFailure, loginUserSuccess, setOrg, setUser, clearState } from "./global.actions"

export interface User {
    _id: string
    name: string
    email: string
    password: string,
    role: string,
}

export interface Org {
    _id: string
    name: string,
    email: string,
    admins: [],
    employees: [],
    address: string
}

// Reducers for global module
export interface IGlobalState {
    user: User,
    org: Org,
    isLoggedIn: boolean
}

export const initialState: IGlobalState = {
    user: {} as User,
    org: {} as Org,
    isLoggedIn: false
}

export const globalReducer = createReducer(
    initialState,
    on(getUser, (state) => {
        console.log("getUser:", "state: ", state);
        return (state);
    }),
    on(setUser, (state, action) => {
        console.log("setUser:", "state: ", state, "action ->", action);
        return ({ ...state, user: { ...state.user, ...action.user } })
    }),
    on(loginUser, (state, action) => {
        console.log("loginUser:", "state: ", state, "action ->", action);
        return (state);
    }),
    on(loginUserSuccess, (state, action) => {
        console.log("loginUserSuccess:", "state: ", state, "action ->", action);
        return ({ ...state, user: { ...state.user, ...action.user }, isLoggedIn: true });
    }),

    on(loginUserFailure, (state, action) => {
        console.log("loginUserFailure:", "state: ", state, "action ->", action);
        return (state);
    }),
    on(fetchOrg, (state, action) => {
        console.log("fetchOrg:", "state: ", state, "action ->", action);
        return (state);
    }),
    on(setOrg, (state, action) => {
        console.log("setOrg:", "state: ", state, "action ->", action);
        return ({ ...state, org: { ...state.org, ...action.org }, });
    }),
    on(fetchOrgSuccess, (state, action) => {
        console.log("fetchOrgSuccess:", "state: ", state, "action ->", action);
        return ({ ...state, org: { ...state.org, ...action.org }, isLoggedIn: true });
    }),

    on(clearState, (state) => {
        console.log("Clearing state...");
        return initialState;
    }),
)