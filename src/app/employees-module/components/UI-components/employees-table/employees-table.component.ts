import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteEmployeeRequest, updateEmployeeRequest } from '../../../store/employees.actions';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent {
  @Input() employees!: any

  _emps:any = []

  @Output() updateEmployee = new EventEmitter<any>();
  @Output() deleteEmployee = new EventEmitter<any>();

  editing: number = -1
  store = inject(Store<{ employees: any }>);

  m_name!: string
  m_email!: string
  m_role!: string

  psize: number = 10;
  currPage: number = 1;
  
  onEdit(_id: any) {
    this.editing = _id
    const editingEmp = this.employees.filter((e: any) => e._id == _id)[0]
    
    console.log("editingEmp: ", editingEmp)
    this.m_name = editingEmp.name
    this.m_email = editingEmp.email
    this.m_role = editingEmp.role
  }

  onCancel() {
    this.editing = -1
  }

  onDone() {
    if (!this.m_name || !this.m_email || !this.m_role) {
      alert("All fields are required!");
      return;
    }
    this.updateEmployee.emit({
      employee: {_id: this.editing,
      name: this.m_name,
      email: this.m_email,
      role: this.m_role}
    })
    this.editing = -1
    console.log(this.m_name, this.m_email, this.m_role)
  }
  
  onDelete(_id: any) {
    if (confirm("Are you sure want to delete this employee")) this.deleteEmployee.emit({ _id })
  }

  search(e: any) {
    if (!this._emps.length) this._emps = this.employees
    this.employees = this._emps.filter((emp:any) => JSON.stringify(emp).toLowerCase().includes(e.target.value))
  }
}
