import { createReducer, on } from "@ngrx/store"
import { addEmployeeFailure, addEmployeeRequest, addEmployeeSuccess, createUserFailure, createUserRequest, createUserSuccess, deleteEmployeeSuccess, fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess, updateEmployeeSuccess } from "./employees.actions"

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

export const employeesReducer = createReducer(
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
    on(updateEmployeeSuccess, (state, action) => {
        console.log("updateEmployee", "state:", state, "action: ", action)
        const newEmployees = state.employees.map((emp) => {
            if (emp._id == action.employee._id) {
                emp = action.employee
            }
            return emp
        })
        
        return ({...state, employees: newEmployees});
    }),
    on(deleteEmployeeSuccess, (state, action) => {
        console.log("deleteEmployee", "state:", state, "action: ", action)
        const newEmployees = state.employees.filter((e) => e._id !== action._id)
        
        return ({...state, employees: newEmployees});
    }),
    
    // 
    on(createUserRequest, (state, action) => {
        console.log("createUserRequest", "state:", state, "action: ", action)
        return (state);
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
        return ({...state, employees: [...state.employees, action.employee]});
    }),
    
    on(addEmployeeFailure, (state,action) => {
        console.log("addEmployeeFailure", "state:", state, "action: ", action)
        return (state)
    })
)