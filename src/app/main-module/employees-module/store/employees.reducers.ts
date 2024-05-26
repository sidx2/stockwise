import { createReducer, on } from "@ngrx/store"
import { addEmployeeFailure, addEmployeeRequest, addEmployeeSuccess, createUserFailure, createUserRequest, createUserSuccess, deleteEmployeeSuccess, fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess, resetEmployeeLoading, setEmployeeLoading, updateEmployeeSuccess } from "./employees.actions"
import { IEmployeesState } from "../models/employee"

export const initialState: IEmployeesState = {
    employees: [],
    isLoading: false,
}

export const employeesReducer = createReducer(
    initialState,
    on(fetchEmployees, (state) => {
        console.log("fetchEmployees", "state:", state, "action: ", )
        return (state)
    }),
    on(fetchEmployeesSuccess, (state, action) => {
        console.log("fetchEmployeesSuccess", "state:", state, "action: ", action)
        return ({...state, employees: action.employees })
    }),
    on(fetchEmployeesFailure, (state, action) => {
        console.log("fetchEmployeesFailure", "state:", state, "action: ", action)
        return (state);
    }),
    on(updateEmployeeSuccess, (state, action) => {
        console.log("updateEmployee", "state:", state, "action: ", action)
        const newEmployees = state.employees.map((emp) => {
            if (emp._id == action.employee._id) {
                emp = action.employee
            }
            return emp
        })
        
        return ({...state, employees: newEmployees });
    }),
    on(deleteEmployeeSuccess, (state, action) => {
        console.log("deleteEmployee", "state:", state, "action: ", action)
        const newEmployees = state.employees.filter((e) => e._id !== action.employeeId)
        
        return ({...state, employees: newEmployees });
    }),
    
    // 
    on(createUserRequest, (state, action) => {
        console.log("createUserRequest", "state:", state, "action: ", action)
        return ({...state });
    }),
    
    on(createUserSuccess, (state,action) => {
        console.log("createUserSuccess", "state:", state, "action: ", action)
        return (state)
    }),
    on(createUserFailure, (state, action) => {
        console.log("createUserFailure", "state:", state, "action: ", action)
        return (state);
    }),
    
    // 
    on(addEmployeeRequest, (state,action) => {
        console.log("addEmployeeRequest", "state:", state, "action: ", action)
        return (state)
    }),
    on(addEmployeeSuccess, (state, action) => {
        console.log("addEmployeeSuccess", "state:", state, "action: ", action)
        return ({...state, employees: [...state.employees, action.employee] });
    }),
    
    on(addEmployeeFailure, (state,action) => {
        console.log("addEmployeeFailure", "state:", state, "action: ", action)
        return (state)
    }),
    
    // loading
    on(setEmployeeLoading, (state) => {
        console.log("setEmployeeLoading", "state:", state, "action: ", undefined)
        return ({ ...state, isLoading: true });
    }),
    on(resetEmployeeLoading, (state) => {
        console.log("resetEmployeeLoading", "state:", state, "action: ", undefined)
        return ({...state, isLoading: false });
    })
)