import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUserRequest, deleteEmployeeRequest, fetchEmployees, updateEmployeeRequest } from '../../../store/employees.actions';
import { employeesSelector } from '../../../store/employees.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { IEmployeesState } from '../../../store/employees.reducers';
import { IGlobalState } from '../../../../../store/global.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
    store = inject (Store<{ employees: IEmployeesState, global: IGlobalState }>)
    employees: Observable<any>
    visible: boolean = false

    orgId!: string



    constructor() {
      this.store.dispatch(fetchEmployees())
      this.employees = this.store.select(employeesSelector)

      this.store.select(orgSelector).subscribe((org) => {
        console.log("org in employees component: ", org);
        this.orgId = org._id
      })
    }

    showDialog() {
      this.visible = !this.visible
    }

    onAddEmployee(event: any) {
      // console.log("data: ", this.addEmployeeForm.value);
      this.visible = !this.visible

      this.store.dispatch(createUserRequest({user: event.employee, orgId: this.orgId}))
    }

    onUpdateEmployee(event: any) {
      this.store.dispatch(updateEmployeeRequest({ employee: event.employee }))
    }
    
    onDeleteEmploye(event: any) {
      
      this.store.dispatch(deleteEmployeeRequest({ _id: event._id }))
    }
}
