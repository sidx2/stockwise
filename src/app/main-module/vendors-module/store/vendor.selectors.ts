import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IVendorsState } from "./vendor.reducers";

export const vendorsFeatureSelector = createFeatureSelector<IVendorsState>("vendors")

export const vendorsSelector = createSelector(
    vendorsFeatureSelector,
    (state) => state.vendors
)