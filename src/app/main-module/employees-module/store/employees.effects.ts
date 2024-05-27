import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addEmployeeFailure, addEmployeeSuccess, createUserFailure, createUserRequest, createUserSuccess, deleteEmployeeFailure, deleteEmployeeRequest, deleteEmployeeSuccess, fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess, resetEmployeeLoading, setEmployeeLoading, updateEmployeeFailure, updateEmployeeRequest, updateEmployeeSuccess } from "./employees.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { EmployeesService } from "../services/employees.service";
import { Store } from "@ngrx/store";
import { IEmployeesState } from "../models/employee";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class EmployeeEffects {
    constructor(
        private action$: Actions,
        private employeesService$: EmployeesService,
        private store: Store<{ employees: IEmployeesState }>,
        private toastr: ToastrService,
    ) { }

    fetchEmployees$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchEmployees),
            tap(() => { this.store.dispatch(setEmployeeLoading()); }),
            switchMap(() =>
                this.employeesService$.fetchEmployees().pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        this.store.dispatch(resetEmployeeLoading());
                        return fetchEmployeesSuccess({ employees: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        const error = err.error.error || "Something went wrong";
                        return of(fetchEmployeesFailure({ error }));
                    }
                    )
                )
            )
        )
    )

    updateEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateEmployeeRequest),
            tap(() => { this.store.dispatch(setEmployeeLoading()); }),
            switchMap(({ employee }) =>
                this.employeesService$.updateEmployee(employee).pipe(
                    map((res: any) => {
                        console.log("res:", res);
                        this.store.dispatch(resetEmployeeLoading());
                        this.toastr.success("Employee updated successfully!");
                        return updateEmployeeSuccess({ employee: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        const error = err.error.error || "Something went wrong";
                        this.toastr.error(`Could not update employee. ${error}`);
                        return of(updateEmployeeFailure({ error }))
                    })
                )
            )
        )
    )

    deleteEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEmployeeRequest),
            tap(() => { this.store.dispatch(setEmployeeLoading()); }),
            switchMap(({ employeeId }) =>
                this.employeesService$.deleteEmployee(employeeId).pipe(
                    map((res: any) => {
                        console.log("res:", res);
                        this.store.dispatch(resetEmployeeLoading());
                        this.toastr.success("Employee deleted successfully!");
                        return deleteEmployeeSuccess({ employeeId });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        console.log("err: ", err);
                        const error = err.error.error || "Something went wrong";
                        this.toastr.error(`Could not delete emploee. ${error}`);
                        return of(deleteEmployeeFailure({ error }));
                    }
                    )
                )
            )
        )
    )

    createUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserRequest),
            tap(() => { this.store.dispatch(setEmployeeLoading()); }),
            switchMap(({ user }) =>
                this.employeesService$.createUser(user).pipe(
                    map((res: any) => {
                        console.log("createUser res:", res);
                        this.store.dispatch(resetEmployeeLoading());
                        this.toastr.success("User created successfully!");
                        return createUserSuccess({ user: res })
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        const error = err.error.error || "Something went wrong";
                        this.toastr.error(`Could not create user. ${error}`);
                        return of(createUserFailure({ error }));
                    })
                )
            )
        )
    )

    addEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserSuccess),
            switchMap(({ user }) =>
                this.employeesService$.addEmployee(user).pipe(
                    map((res: any) => {
                        console.log("addEmp res:", res);
                        this.store.dispatch(resetEmployeeLoading());
                        this.toastr.success("Employee was added to the organization successfully!");
                        return addEmployeeSuccess({ employee: user });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        const error = err.error.error || "Something went wrong";
                        this.toastr.error(`Could not add employee to the organization. ${error}`);
                        return of(addEmployeeFailure({ error }));
                    })
                )
            )
        )
    )
}