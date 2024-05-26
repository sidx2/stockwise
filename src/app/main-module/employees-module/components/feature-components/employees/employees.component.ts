import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUserRequest, deleteEmployeeRequest, fetchEmployees, updateEmployeeRequest } from '../../../store/employees.actions';
import { employeesStateSelector } from '../../../store/employees.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Employee, IAddEmployee, IEmployeesState } from '../../../models/employee';
import { orgSelector } from '../../../../../store/global.selectors';
import { IGlobalState } from '../../../../../models/global';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnDestroy {
  store = inject(Store<{ employees: IEmployeesState, global: IGlobalState }>)
  employees!: Employee[];
  visible: boolean = false;
  isLoading: boolean = false;

  orgId!: string;
  destroySubject = new Subject<void>();

  constructor() {
    this.store.dispatch(fetchEmployees());
    this.store.select(employeesStateSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((state) => {
      this.isLoading = state.isLoading;
      this.employees = state.employees;
    })

    this.store.select(orgSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((org) => {
      this.orgId = org._id;
    })

  }

  showDialog() {
    this.visible = !this.visible;
  }

  onAddEmployee(user: IAddEmployee) {
    this.visible = !this.visible
    this.store.dispatch(createUserRequest({ user, orgId: this.orgId }))
  }

  onUpdateEmployee(employee: Employee) {
    this.store.dispatch(updateEmployeeRequest({ employee }))
  }

  onDeleteEmploye(employeeId: string) {
    this.store.dispatch(deleteEmployeeRequest({ employeeId }))
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
