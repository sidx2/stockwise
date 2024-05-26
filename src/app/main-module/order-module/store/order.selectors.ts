import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IOrderState } from "../models/order";

export const orderFeatureSelector = createFeatureSelector<IOrderState>("order")

export const productVendorsSelector = createSelector(
    orderFeatureSelector,
    (state) => state.productVendors
)

export const productVendorsStateSelector = createSelector(
    orderFeatureSelector,
    (state) => state,
)