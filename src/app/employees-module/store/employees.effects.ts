import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addEmployeeFailure, addEmployeeRequest, addEmployeeSuccess, createUserFailure, createUserRequest, createUserSuccess, deleteEmployeeFailure, deleteEmployeeRequest, deleteEmployeeSuccess, fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess, updateEmployeeFailure, updateEmployeeRequest, updateEmployeeSuccess } from "./employees.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { EmployeesService } from "../services/employees.service";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class EmployeeEffects {
    action$ = inject(Actions)
    employeesService$ = inject(EmployeesService)
    store = inject(Store<{ employees: any }>)
    cs = inject(CookieService)
    // orgId = JSON.parse(this.cs.get("org"))._id

    fetchEmployees$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchEmployees),
            switchMap((u) =>
                this.employeesService$.fetchEmployees().pipe(
                    map((res: any) => {
                        console.log("res:", res)
                        return fetchEmployeesSuccess({ employees: res})
                    }),
                    catchError((err) =>
                        of(fetchEmployeesFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )

    updateEmployee$ = createEffect(() =>
    this.action$.pipe(
        ofType(updateEmployeeRequest),
        switchMap((emp) =>
            this.employeesService$.updateEmployee(emp).pipe(
                map((res: any) => {
                    console.log("res:", res)
                    return updateEmployeeSuccess({ employee: res})
                }),
                catchError((err) =>
                    of(updateEmployeeFailure({ error: "something fucked up! LoL!" }))
                )
            )
        )
    )
)

deleteEmployee$ = createEffect(() =>
this.action$.pipe(
    ofType(deleteEmployeeRequest),
    switchMap((emp) =>
        this.employeesService$.deleteEmployee(emp).pipe(
            map((res: any) => {
                console.log("res:", res)
                return deleteEmployeeSuccess({ _id: emp._id })
            }),
            catchError((err) =>
                of(deleteEmployeeFailure({ error: "something fucked up! LoL!" }))
            )
        )
    )
)
)

    createUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserRequest),
            switchMap((data) =>
                this.employeesService$.createUser(data.user).pipe(
                    map((res: any) => {
                        console.log("createUser res:", res)
                        // this.store.dispatch(addEmployeeRequest({ employee: res }))
                        return createUserSuccess({ user: res, orgId: data.orgId })
                    }),
                    catchError((err) =>
                        of(createUserFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )

    addEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserSuccess),
            switchMap((data) =>
                this.employeesService$.addEmployee(data.user, data.orgId).pipe(
                    map((res: any) => {
                        console.log("addEmp res:", res)
                        return addEmployeeSuccess({ employee: data.user })
                    }),
                    catchError((err) =>
                        of(addEmployeeFailure({ error: "something fucked up! LoL!" }))
                    )
                )
            )
        )
    )
}