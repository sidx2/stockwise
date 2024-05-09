import { createFeatureSelector, createSelector } from "@ngrx/store";

const globalFeatureSelector = createFeatureSelector<any>("global");

export const userSelector = createSelector(
    globalFeatureSelector,
    (state) => state.user
)

export const orgSelector = createSelector(
    globalFeatureSelector,
    (state) => state.org
)

export const globalStateSelector = createSelector(
    globalFeatureSelector,
    (state) => state
)