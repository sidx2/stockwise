import { createReducer, on } from "@ngrx/store"
import { fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess } from "./employees.actions"


export interface Employee {
    name: string,
    email: string,
    role: string
}

export interface IEmployeesState {
    employees: Employee[]
}

export const initialState: IEmployeesState = {
    employees: []
}

export const employeesReduer = createReducer(
    initialState,
    on(fetchEmployees, (state) => {
        console.log("fetchEmployees", "state:", state, "action: ", )
        return (state)
    }),
    on(fetchEmployeesSuccess, (state, action) => {
        console.log("fetchEmployeesSuccess", "state:", state, "action: ", action)
        return ({...state, employees: action.employees})
    }),
    on(fetchEmployeesFailure, (state, action) => {
        console.log("fetchEmployeesFailure", "state:", state, "action: ", action)
        return (state);
    })
)