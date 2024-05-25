import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IHistoryState } from "../models/order-history";

export const historyFeatureSelector = createFeatureSelector<IHistoryState>("history");

export const historySelector = createSelector(
    historyFeatureSelector,
    (state) => state
)