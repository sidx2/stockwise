import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from "../models/auth";

export const authFeatureSelector = createFeatureSelector<IAuthState>("auth");

export const authStateSelector = createSelector(
    authFeatureSelector,
    (state) => state,
)