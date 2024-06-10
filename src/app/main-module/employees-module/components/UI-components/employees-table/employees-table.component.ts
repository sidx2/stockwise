import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { customValidators } from '../../../../../shared-module/validators/customValidators';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent {
  @Input() employees!: Employee[];

  @Output() updateEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<string>();

  _emps: Employee[] = []
  editing: string = "-1";
  showModal: boolean = false;
  employeeToDelete: string | null = null;

  editEmployeeForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    email: new FormControl("", [Validators.required, customValidators.validEmail]),
    role: new FormControl("", [Validators.required])
  });

  psize: number = 10;
  currPage: number = 1;

  constructor(private toastr: ToastrService) {}

  onEdit(_id: string) {
    if (this.editing !== "-1" && this.editEmployeeForm.dirty) {
      this.editEmployeeForm.markAsPristine;
      if(!confirm("Changes you made will be discarded!"))  return;
    }

    this.editing = _id;
    const editingEmp = this.employees.find(emp => emp._id === _id);

    if (editingEmp) {
      this.editEmployeeForm.setValue({
        name: editingEmp.name,
        email: editingEmp.email,
        role: editingEmp.role
      });
    }
  }
  
  onCancel() {
    this.editing = "-1";
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
      role: this.editEmployeeForm.value.role!
    });

    this.editing = "-1";
  }

  onDelete(_id: string) {
    this.showModal = true;
    this.employeeToDelete = _id;
  }
  
  handleConfirm() {
    if (this.employeeToDelete) {
      this.deleteEmployee.emit(this.employeeToDelete);
    }
    this.showModal = false;
  }
  
  handleCancel() {
    this.showModal = false;
  }
  
  onConfirmDelete() {
    this.showModal = !this.showModal;
    if (this.employeeToDelete) {
      this.deleteEmployee.emit(this.employeeToDelete);
      this.employeeToDelete = null;
    }
  }
  
  search(e: Event) {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
    this.employees = this._emps.filter(emp => JSON.stringify(emp).toLowerCase().includes(searchTerm));
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
