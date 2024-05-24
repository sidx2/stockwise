import { createAction, props } from "@ngrx/store";

export const fetchEmployees = createAction("fetchEmployees");
export const fetchEmployeesSuccess = createAction("fetchEmployeesSuccess", props<any>());
export const fetchEmployeesFailure = createAction("fetchEmployeesFailure", props<any>());

export const deleteEmployeeRequest = createAction("deleteEmployee", props<any>())
export const deleteEmployeeSuccess = createAction("deleteEmployeeSuccess", props<any>())
export const deleteEmployeeFailure = createAction("deleteEmployeeFailure", props<any>())

export const createUserRequest = createAction("createUserRequest", props<any>());
export const createUserSuccess = createAction("createUserSuccess", props<any>());
export const createUserFailure = createAction("createUserFailure", props<any>());

export const updateEmployeeRequest = createAction("updateEmployeeRequest", props<any>());
export const updateEmployeeSuccess = createAction("updateEmployeeSuccess", props<any>());
export const updateEmployeeFailure = createAction("updateEmployeeFailure", props<any>());

export const addEmployeeRequest = createAction("addEmployeeRequest", props<any>());
export const addEmployeeSuccess = createAction("addEmployeeSuccess", props<any>())
export const addEmployeeFailure = createAction("addEmployeeFailure", props<any>())