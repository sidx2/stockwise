import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddEmployee } from '../../../models/employee';
import { customValidators } from '../../../../../shared-module/validators/customValidators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  @Output() addEmployee = new EventEmitter<IAddEmployee>();
  @Output() closeAddEmployee = new EventEmitter();

  addEmployeeForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.min(3), Validators.max(128)]),
    email: new FormControl("", [Validators.required, customValidators.validEmail]),
    role: new FormControl("employee", [Validators.required]),
  })

  constructor(
    private toastr: ToastrService,
  ) { }

  getErrorMessage(controlName: string): string {
    const control = this.addEmployeeForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Must be at least ${requiredLength} characters long.`;
    }
    if (control?.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength').requiredLength;
      return `Cannot exceed ${requiredLength} characters.`;
    }
    if (control?.hasError('validEmail')) {
      return 'Please enter a valid email address.';
    }
    
    return '';
  }
  
  onAddEmployee() {
    if (!this.addEmployeeForm.valid) {
      for (const key of Object.keys(this.addEmployeeForm.value)) {
        const error = this.getErrorMessage(key)
        this.toastr.error(`Invalid ${key}. ${error}`);
      }
      return;
    }
    
    const employee = {
      name: this.addEmployeeForm.value.name!,
      email: this.addEmployeeForm.value.email!,
      role: this.addEmployeeForm.value.role!
    };

    this.addEmployeeForm.reset();
    this.addEmployee.emit(employee);
  }

  onCloseVendor(){
    this.closeAddEmployee.emit()
  }

}
