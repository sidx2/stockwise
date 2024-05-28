import { createReducer, on } from "@ngrx/store"
import { 
    addEmployeeFailure, addEmployeeRequest, addEmployeeSuccess, 
    createUserFailure, createUserRequest, createUserSuccess, 
    deleteEmployeeSuccess, fetchEmployeesRequest, fetchEmployeesFailure, 
    fetchEmployeesSuccess, updateEmployeeSuccess, updateEmployeeRequest, 
    deleteEmployeeFailure, 
    deleteEmployeeRequest
} from "./employees.actions"
import { IEmployeesState } from "../models/employee"

export const initialState: IEmployeesState = {
    employees: [],
    isLoading: false,
}

export const employeesReducer = createReducer(
    initialState,
    // fetch employee
    on(fetchEmployeesRequest, (state) => {
        return ({...state, isLoading: true});
    }),

    on(fetchEmployeesSuccess, (state, action) => {
        return ({...state, employees: action.employees, isLoading: false })
    }),

    on(fetchEmployeesFailure, (state) => {
        return ({...state, isLoading: false});
    }),

    // update employee
    on(updateEmployeeRequest, (state) => {
        return ({...state, isLoading: true});
    }),

    on(updateEmployeeSuccess, (state, action) => {
        const newEmployees = state.employees.map((emp) => {
            if (emp._id == action.employee._id) {
                emp = action.employee
            }
            return emp
        })
        
        return ({...state, employees: newEmployees, isLoading: false });
    }),

    on(updateEmployeeRequest, (state) => {
        return ({...state, isLoading: true});
    }),

    // delete employee
    on(deleteEmployeeRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),

    on(deleteEmployeeSuccess, (state, action) => {
        const newEmployees = state.employees.filter((e) => e._id !== action.employeeId)  
        return ({...state, employees: newEmployees, isLoading: false });
    }),
    
    on(deleteEmployeeFailure, (state) => {
        return ({...state, isLoading: false });
    }),

    // create user
    on(createUserRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),
    
    on(createUserSuccess, (state) => {
        return ({ ...state, isLoading: false });
    }),

    on(createUserFailure, (state,) => {
        return ({ ...state, isLoading: false });
    }),
   
    // add employee
    on(addEmployeeRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),

    on(addEmployeeSuccess, (state, action) => {
        return ({...state, employees: [...state.employees, action.employee], isLoading: false });
    }),
    
    on(addEmployeeFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),
)