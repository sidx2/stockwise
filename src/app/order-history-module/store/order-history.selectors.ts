import { createFeatureSelector, createSelector } from "@ngrx/store";

export const historyFeatureSelector = createFeatureSelector<any>("history");

export const historySelector = createSelector(
    historyFeatureSelector,
    (state) => state
)