import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vendor } from '../../../store/vendor.reducers';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.scss'
})
export class AddVendorComponent {
  visible = false
  @Output() addVendor = new EventEmitter<Vendor>()

  addVendorForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.min(3), Validators.max(128)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    address: new FormControl("", [Validators.required, Validators.min(3), Validators.max(128)]),
    phone: new FormControl("", [Validators.required]),
  })

  toggleDialog() {
    this.visible = !this.visible;
  }

  getErrorMessage(controlName: string): string {
    const control = this.addVendorForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('email')) {
      return 'Invalid email address.';
    }
    if (control?.hasError('minlength')) {
      return 'Must be at least ' + control.getError('minlength').requiredLength + ' characters long.';
    }
    if (control?.hasError('maxlength')) {
      return 'Cannot exceed ' + control.getError('maxlength').requiredLength + ' characters.';
    }

    return '';
  }

  onAddVendor() {
    if (!this.addVendorForm.valid) {
      alert("All fields are required")
      return;
    }
    this.addVendor.emit(this.addVendorForm.value as Vendor)
    this.toggleDialog();
  }
}
