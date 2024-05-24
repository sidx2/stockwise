import { createFeatureSelector, createSelector } from "@ngrx/store";

export const employeesFeatureSelector = createFeatureSelector<any>("employees")

export const employeesSelector = createSelector(
    employeesFeatureSelector,
    (state) => state.employees
)
