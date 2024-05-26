import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IEmployeesState } from "../models/employee";

export const employeesFeatureSelector = createFeatureSelector<IEmployeesState>("employees")

export const employeesSelector = createSelector(
    employeesFeatureSelector,
    (state) => state.employees
);

export const employeesStateSelector = createSelector(
    employeesFeatureSelector,
    (state) => state
);
