import { createReducer, on } from "@ngrx/store"
import { fetchOrg, fetchOrgSuccess, getUser, loginUser, loginUserFailure, loginUserSuccess, setOrg, setUser, logoutUserSuccess, init } from "./global.actions"
import { IGlobalState, Org, User } from "../models/global"

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
        return ({ ...state, user: { ...state.user, ...action.user }, isLoggedIn: true })
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
        return ({ ...state, org: { ...state.org, ...action.org }, isLoggedIn: true });
    }),
    on(fetchOrgSuccess, (state, action) => {
        console.log("fetchOrgSuccess:", "state: ", state, "action ->", action);
        return ({ ...state, org: { ...state.org, ...action.org }, isLoggedIn: true });
    }),

    on(logoutUserSuccess, (state) => {
        console.log("Clearing state...");
        return initialState;
    }),

    on(init, (state, action) => {
        console.log("init: ", "state: ", state, "action: ", action);
        return ({...state, user: action.user, org: action.org, isLoggedIn: true})
    })
)