import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee, IEmployeesState } from '../../../models/employee';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent {
  @Input() employees!: Employee[]
  _emps: Employee[] = []

  @Output() updateEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<string>();

  editing: string = "-1"
  
  m_name!: string
  m_email!: string
  m_role!: string
  
  psize: number = 10;
  currPage: number = 1;
  
  constructor() {}

  onEdit(_id: string) {
    this.editing = _id
    const editingEmp = this.employees?.filter((emp: Employee) => emp._id == _id)[0]

    this.m_name = editingEmp?.name || "";
    this.m_email = editingEmp?.email || "";
    this.m_role = editingEmp?.role || "";
  }

  onCancel() {
    this.editing = "-1"
  }

  onDone() {
    if (!this.m_name || !this.m_email || !this.m_role) {
      alert("All fields are required!");
      return;
    }
    this.updateEmployee.emit({
      _id: this.editing,
      name: this.m_name,
      email: this.m_email,
      role: this.m_role
    })
    this.editing = "-1";
  }

  onDelete(_id: string) {
    if (confirm("Are you sure want to delete this employee?")) 
      this.deleteEmployee.emit(_id)
  }

  search(e: Event) {
    if (!this._emps.length) this._emps = this.employees
    this.currPage = 1;
    this.employees = this._emps.filter((emp: Employee) => JSON.stringify(emp).toLowerCase().includes((e.target as HTMLInputElement).value))
  }
}
