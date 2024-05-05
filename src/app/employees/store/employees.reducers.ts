import { createReducer, on } from "@ngrx/store"
import { deleteEmployee, fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess, updateEmployee } from "./employees.actions"

export interface Employee {
    _id: any,
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
    }),
    on(updateEmployee, (state, action) => {
        console.log("updateEmployee", "state:", state, "action: ", action)
        const newEmployees = state.employees.map((emp) => {
            if (emp._id == action.employee._id) {
                emp = action.employee
            }
            return emp
        })
        
        return ({...state, employees: newEmployees});
    }),
    on(deleteEmployee, (state, action) => {
        console.log("deleteEmployee", "state:", state, "action: ", action)
        const newEmployees = state.employees.filter((e) => e._id !== action._id)

        return ({...state, employees: newEmployees});
    })
)