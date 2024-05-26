import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUserRequest, deleteEmployeeRequest, fetchEmployees, updateEmployeeRequest } from '../../../store/employees.actions';
import { employeesStateSelector } from '../../../store/employees.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Employee, IAddEmployee, IEmployeesState } from '../../../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnDestroy {
  store = inject(Store<{ employees: IEmployeesState }>)
  employees!: Employee[];
  visible: boolean = false;
  isLoading: boolean = false;

  destroySubject = new Subject<void>();

  constructor() {
    this.store.dispatch(fetchEmployees());
    this.store.select(employeesStateSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((state) => {
      this.isLoading = state.isLoading;
      this.employees = state.employees;
    })
  }

  showDialog() {
    this.visible = !this.visible;
  }

  onAddEmployee(user: IAddEmployee) {
    this.visible = !this.visible
    this.store.dispatch(createUserRequest({ user }))
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
