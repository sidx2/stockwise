import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.scss'
})
export class AddVendorComponent {
  visible = false
  @Output() addVendor = new EventEmitter<any>()

  addVendorForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
  })

  toggleDialog() {
    this.visible = !this.visible
  }

  onAddVendor() {
    if (!this.addVendorForm.valid) {
      alert("Invalid form")
      return;
    }
    this.addVendor.emit({ vendor: this.addVendorForm.value })
    this.toggleDialog();
  }
}
