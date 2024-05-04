import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { fetchEmployees, fetchEmployeesFailure, fetchEmployeesSuccess } from "./employees.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { EmployeesService } from "../employees.service";

@Injectable()
export class EmployeeEffects {
    action$ = inject(Actions)
    employeesService$ = inject(EmployeesService)

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
}