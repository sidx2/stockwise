import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IVendorsState } from "../models/vendor";

export const vendorsFeatureSelector = createFeatureSelector<IVendorsState>("vendors")

export const vendorsSelector = createSelector(
    vendorsFeatureSelector,
    (state) => state.vendors
)

export const vendorsStateSelector = createSelector(
    vendorsFeatureSelector,
    (state) => state
)