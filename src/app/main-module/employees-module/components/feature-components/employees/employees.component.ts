import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addEmployeeRequest, createUserRequest, deleteEmployeeRequest, fetchEmployees, updateEmployeeRequest } from '../../../store/employees.actions';
import { employeesSelector } from '../../../store/employees.selectors';
import { Observable } from 'rxjs';
import { Employee, IAddEmployee, IEmployeesState } from '../../../models/employee';
import { orgSelector } from '../../../../../store/global.selectors';
import { IGlobalState } from '../../../../../models/global';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
    store = inject (Store<{ employees: IEmployeesState, global: IGlobalState }>)
    employees: Observable<Employee[]>
    visible: boolean = false

    orgId!: string

    constructor() {
      this.store.dispatch(fetchEmployees())
      this.employees = this.store.select(employeesSelector)

      this.store.select(orgSelector).subscribe((org) => {
        this.orgId = org._id;
      })
    }

    showDialog() {
      this.visible = !this.visible
    }

    onAddEmployee(user: IAddEmployee) {
      this.visible = !this.visible
      this.store.dispatch(createUserRequest({ user, orgId: this.orgId}))
    }

    onUpdateEmployee(employee: Employee) {
      this.store.dispatch(updateEmployeeRequest({ employee }))
    }
    
    onDeleteEmploye(employeeId: string) {
      this.store.dispatch(deleteEmployeeRequest({ employeeId }))
    }
}
