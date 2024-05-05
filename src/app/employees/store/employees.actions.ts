import { createAction, props } from "@ngrx/store";

export const fetchEmployees = createAction("fetchEmployees");

export const fetchEmployeesSuccess = createAction("fetchEmployeesSuccess", props<any>());

export const fetchEmployeesFailure = createAction("fetchEmployeesFailure", props<any>());

export const updateEmployee = createAction("updateEmployee", props<any>())

export const deleteEmployee = createAction("deleteEmployee", props<any>())