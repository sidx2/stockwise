import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addEmployeeFailure, addEmployeeSuccess, createUserFailure, createUserRequest, createUserSuccess, deleteEmployeeFailure, deleteEmployeeRequest, deleteEmployeeSuccess, fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess, resetEmployeeLoading, setEmployeeLoading, updateEmployeeFailure, updateEmployeeRequest, updateEmployeeSuccess } from "./employees.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { EmployeesService } from "../services/employees.service";
import { Store } from "@ngrx/store";
import { IEmployeesState } from "../models/employee";

@Injectable()
export class EmployeeEffects {
    constructor(
        private action$: Actions,
        private employeesService$: EmployeesService,
        private store: Store<{ employees: IEmployeesState }>,
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
                        return of(fetchEmployeesFailure({ error: err.error.error || err.error.message || "Something went wrong" }));
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
                        return updateEmployeeSuccess({ employee: res });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        return of(updateEmployeeFailure({ error: err.error.error || err.error.message || "Something went wrong" }))
                    }
                    )
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
                        return deleteEmployeeSuccess({ employeeId });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        return of(deleteEmployeeFailure({ error: err.error.error || err.error.message || "Something went wrong" }));
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
            switchMap(({ user, orgId }) =>
                this.employeesService$.createUser(user).pipe(
                    map((res: any) => {
                        console.log("createUser res:", res);
                        this.store.dispatch(resetEmployeeLoading());
                        // this.store.dispatch(addEmployeeRequest({ employee: res }))
                        return createUserSuccess({ user: res, orgId })
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        return of(createUserFailure({ error: err.error.error || err.error.message || "Something went wrong" }));
                    }
                    )
                )
            )
        )
    )

    addEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserSuccess),
            switchMap(({ user, orgId }) =>
                this.employeesService$.addEmployee(user, orgId).pipe(
                    map((res: any) => {
                        console.log("addEmp res:", res);
                        this.store.dispatch(resetEmployeeLoading());
                        return addEmployeeSuccess({ employee: user });
                    }),
                    catchError((err) => {
                        this.store.dispatch(resetEmployeeLoading());
                        return of(addEmployeeFailure({ error: err.error.error || err.error.message || "Something went wrong" }));
                    })
                )
            )
        )
    )
}