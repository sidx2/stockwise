import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Employee } from '../../../models/employee';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { customValidators } from '../../../../../shared-module/validators/customValidators';

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

  editEmployeeForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    email: new FormControl("", [Validators.required, customValidators.validEmail]),
    role: new FormControl("", [Validators.required])
  })

  psize: number = 10;
  currPage: number = 1;

  private searchSubject = new Subject<string>();
  private destroySubject = new Subject<void>();

  constructor(
    private toastr: ToastrService,
  ) {
    this.searchSubject.pipe(
      debounceTime(500),  // 0.5 seconds
      takeUntil(this.destroySubject)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  onEdit(_id: string) {
    this.editing = _id
    const editingEmp = this.employees?.filter((emp: Employee) => emp._id == _id)[0]

    const value = {
      name: editingEmp.name,
      email: editingEmp.email,
      role: editingEmp.role,
    }
    this.editEmployeeForm.setValue(value);
  }

  onCancel() {
    this.editing = "-1"
  }

  getErrorMessage(controlName: string): string {
    const control = this.editEmployeeForm.get(controlName);

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

  onDone() {
    if (!this.editEmployeeForm.dirty) {
      this.editing = "-1";
      return;
    }
    if (!this.editEmployeeForm.valid) {
      this.toastr.error("Invalid value for updating employee");
      return;
    }

    this.updateEmployee.emit({
      _id: this.editing,
      name: this.editEmployeeForm.value.name!,
      email: this.editEmployeeForm.value.email!,
      role: this.editEmployeeForm.value.role!,
    })

    this.editing = "-1";
  }

  onDelete(_id: string) {
    if (confirm("Are you sure want to delete this employee?"))
      this.deleteEmployee.emit(_id)
  }

  search(e: Event) {
    this.searchSubject.next((e.target as HTMLInputElement).value);
  }

  private performSearch(searchTerm: string) {
    if (!this._emps.length) this._emps = this.employees;
    this.currPage = 1;
    this.employees = this._emps.filter(emp => JSON.stringify(emp).toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
