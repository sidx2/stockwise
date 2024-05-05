import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Init } from 'v8';
import { deleteEmployee, updateEmployee } from '../../store/employees.actions';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent implements OnInit {
  @Input() employees!: any
  employeeForms: FormGroup[] = []
  editing: number = -1
  store = inject(Store<{ employees: any }>);

  m_name!: string
  m_email!: string
  m_role!: string

  ngOnInit(): void  {
    if (this.employees) {
      console.log("this.employees: ", this.employees)
      for (const e of this.employees) {
        this.employeeForms.push(new FormGroup({
          name: new FormControl(e.name),
          email: new FormControl(e.email),
          role: new FormControl(e.role)
        }))
      }
    }

    console.log("this.employeesForms", this.employeeForms)
  }
  
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
    this.store.dispatch(updateEmployee({
      employee: {_id: this.editing,
      name: this.m_name,
      email: this.m_email,
      role: this.m_role}
    }))
    this.editing = -1
    console.log(this.m_name, this.m_email, this.m_role)
  }
  
  onDelete(_id: any) {
      this.store.dispatch(deleteEmployee({ _id }))
  }

  onUpdate(e: any) {
      console.log("updating...", e)
  }
}
