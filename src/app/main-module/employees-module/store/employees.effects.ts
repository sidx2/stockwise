import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addEmployeeFailure, addEmployeeRequest, addEmployeeSuccess, createUserFailure, createUserRequest, createUserSuccess, deleteEmployeeFailure, deleteEmployeeRequest, deleteEmployeeSuccess, fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess, updateEmployeeFailure, updateEmployeeRequest, updateEmployeeSuccess } from "./employees.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { EmployeesService } from "../services/employees.service";

@Injectable()
export class EmployeeEffects {
    constructor(
        private action$: Actions,
        private employeesService$: EmployeesService,
    ) {}

    fetchEmployees$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchEmployees),
            switchMap((u) =>
                this.employeesService$.fetchEmployees().pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return fetchEmployeesSuccess({ employees: res })
                    }),
                    catchError((err) =>
                        of(fetchEmployeesFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    updateEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateEmployeeRequest),
            switchMap(({employee}) =>
                this.employeesService$.updateEmployee(employee).pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return updateEmployeeSuccess({ employee: res })
                    }),
                    catchError((err) =>
                        of(updateEmployeeFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    deleteEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEmployeeRequest),
            switchMap(({ employeeId }) =>
                this.employeesService$.deleteEmployee(employeeId).pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return deleteEmployeeSuccess({ employeeId })
                    }),
                    catchError((err) =>
                        of(deleteEmployeeFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )

    createUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserRequest),
            switchMap(({ user, orgId }) =>
                this.employeesService$.createUser(user).pipe(
                    map((res: any) => {
                        console.log("createUser res:", res)
                        // this.store.dispatch(addEmployeeRequest({ employee: res }))
                        return createUserSuccess({ user: res, orgId })
                    }),
                    catchError((err) =>
                        of(createUserFailure({ error: "Something went wrong" }))
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
                        console.log("addEmp res:", res)
                        return addEmployeeSuccess({ employee: res })
                    }),
                    catchError((err) =>
                        of(addEmployeeFailure({ error: "Something went wrong" }))
                    )
                )
            )
        )
    )
}