import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  @Output() addEmployee = new EventEmitter<any>();
  visible = false

  addEmployeeForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    role: new FormControl("user", [Validators.required]),
  })

  toggleDialog() {
    this.visible = !this.visible
  }

  onAddEmployee() {
    if (!this.addEmployeeForm.valid) {
      alert("All fields are required!");
      return;
    }
    this.addEmployee.emit({ employee: this.addEmployeeForm.value });
    this.toggleDialog();
  }
}
