import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUserRequest, deleteEmployeeRequest, fetchEmployees, updateEmployeeRequest } from '../../../store/employees.actions';
import { employeesSelector } from '../../../store/employees.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { IGlobalState } from '../../../../../store/global.reducers';
import { Observable } from 'rxjs';
import { Employee, IAddEmployee, IEmployeesState } from '../../../../../employees-module/models/employee';

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

    onAddEmployee(employee: IAddEmployee) {
      this.visible = !this.visible
      this.store.dispatch(createUserRequest({user: employee, orgId: this.orgId}))
    }

    onUpdateEmployee(employee: Employee) {
      this.store.dispatch(updateEmployeeRequest({ employee }))
    }
    
    onDeleteEmploye(_id: string) {
      
      this.store.dispatch(deleteEmployeeRequest({ _id }))
    }
}
