import { createFeatureSelector, createSelector } from "@ngrx/store";

export const vendorsFeatureSelector = createFeatureSelector<any>("vendors")

export const vendorsSelector = createSelector(
    vendorsFeatureSelector,
    (state) => state.vendors
)