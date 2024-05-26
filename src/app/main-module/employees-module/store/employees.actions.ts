import { createAction, props } from "@ngrx/store";
import { Employee, IAddEmployee } from "../models/employee";
import { User } from "../../../models/global";

export const fetchEmployees = createAction("fetchEmployees");
export const fetchEmployeesSuccess = createAction("fetchEmployeesSuccess", props<{ employees: Employee[] }>());
export const fetchEmployeesFailure = createAction("fetchEmployeesFailure", props<{ error: string }>());

export const deleteEmployeeRequest = createAction("deleteEmployee", props<{ employeeId: string }>())
export const deleteEmployeeSuccess = createAction("deleteEmployeeSuccess", props<{ employeeId: string }>())
export const deleteEmployeeFailure = createAction("deleteEmployeeFailure", props<{ error: string }>())

export const createUserRequest = createAction("createUserRequest", props<{ user: IAddEmployee, orgId: string }>());
export const createUserSuccess = createAction("createUserSuccess", props<{ user: User, orgId: string }>());
export const createUserFailure = createAction("createUserFailure", props<{ error: string }>());

export const updateEmployeeRequest = createAction("updateEmployeeRequest", props<{ employee: Employee }>());
export const updateEmployeeSuccess = createAction("updateEmployeeSuccess", props<{ employee: Employee }>());
export const updateEmployeeFailure = createAction("updateEmployeeFailure", props<{ error: string }>());

export const addEmployeeRequest = createAction("addEmployeeRequest", props<{ employee: Employee }>());
export const addEmployeeSuccess = createAction("addEmployeeSuccess", props<{ employee: Employee }>())
export const addEmployeeFailure = createAction("addEmployeeFailure", props<{ error: string }>());

export const setEmployeeLoading = createAction('setEmployeeLoading');
export const resetEmployeeLoading = createAction('resetEmployeeLoading');