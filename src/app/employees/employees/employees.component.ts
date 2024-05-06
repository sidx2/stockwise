import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUserRequest, fetchEmployees } from '../store/employees.actions';
import { employeesSelector } from '../store/employees.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { orgSelector } from '../../store/global.selectors';
import { createItemRequest } from '../../inventory-module/store/inventory.action';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
    store = inject (Store<{ employees: any, global: any }>)
    employees!: any
    visible: boolean = false

    orgId: any

    addEmployeeForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      role: new FormControl("user", [Validators.required]),
    })

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

    onAddEmployee() {
      console.log("data: ", this.addEmployeeForm.value);
      this.visible = !this.visible

      this.store.dispatch(createUserRequest({user: this.addEmployeeForm.value, orgId: this.orgId}))
    }
}
