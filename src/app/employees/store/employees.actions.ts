import { createAction, props } from "@ngrx/store";

export const fetchEmployees = createAction("fetchEmployees");

export const fetchEmployeesSuccess = createAction("fetchEmployeesSuccess", props<any>());

export const fetchEmployeesFailure = createAction("fetchEmployeesFailure", props<any>());