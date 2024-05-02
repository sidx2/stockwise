import { createFeatureSelector, createSelector } from "@ngrx/store";

const globalUserFeatureSelector = createFeatureSelector<any>("global");

export const userSelector = createSelector(
    globalUserFeatureSelector,
    (state) => state.user
)

export const orgSelector = createSelector(
    globalUserFeatureSelector,
    (state) => state.org
)