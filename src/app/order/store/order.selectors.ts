import { createFeatureSelector, createSelector } from "@ngrx/store";

export const orderFeatureSelector = createFeatureSelector<any>("order")

export const productVendorsSelector = createSelector(
    orderFeatureSelector,
    (state) => state.productVendors
)