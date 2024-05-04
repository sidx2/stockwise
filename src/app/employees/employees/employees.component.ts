import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchEmployees } from '../store/employees.actions';
import { employeesSelector } from '../store/employees.selectors';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
    store = inject (Store<{ employees: any }>)
    employees!: any
    constructor() {
      this.store.dispatch(fetchEmployees())

      this.employees = this.store.select(employeesSelector)
    }
}
