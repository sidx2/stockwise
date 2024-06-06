import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vendor } from '../../../models/vendor';
import { customValidators } from '../../../../../shared-module/validators/customValidators';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.scss'
})
export class AddVendorComponent {
  @Output() addVendor = new EventEmitter<Vendor>()
  @Output() closeAddVendor = new EventEmitter()

  addVendorForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.min(3), Validators.max(128)]),
    email: new FormControl("", [Validators.required, customValidators.validEmail]),
    address: new FormControl("", [Validators.required, Validators.min(3), Validators.max(128)]),
    phone: new FormControl("", [Validators.required, customValidators.validPhoneNumber]),
  })

  onAddVendor() {
    if (!this.addVendorForm.valid) {
      alert("Invalid input")
      return;
    }
    this.addVendor.emit(this.addVendorForm.value as Vendor)
  }

  onCloseVendor(){
    this.closeAddVendor.emit()
  }
}
