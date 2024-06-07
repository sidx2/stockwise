import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vendor } from '../../../models/vendor';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customValidators } from '../../../../../shared-module/validators/customValidators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrl: './vendors-table.component.scss'
})
export class VendorsTableComponent implements OnInit {
  @Input() vendors!: Vendor[]

  @Output() updateVendor = new EventEmitter<Vendor>();
  @Output() deleteVendor = new EventEmitter<string>();

  _vends: Vendor[] = [] // for search purpose
  visisble: boolean = false
  editingId: string = "-1"

  editVendorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    email: new FormControl('', [Validators.required, customValidators.validEmail]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    phone: new FormControl('', [Validators.required, customValidators.validPhoneNumber]),
    orgId: new FormControl('')
  });

  psize: number = 10;
  currPage: number = 1;

  private searchSubject = new Subject<string>();
  destroySubject = new Subject<void>();

  constructor(
    private toastr: ToastrService,
  ) {
    this.searchSubject.pipe(
      debounceTime(300),  // 0.3 seconds
      takeUntil(this.destroySubject)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void { }


  onEdit(_id: string) {
    this.editingId = _id
    const editingVendor: Vendor = this.vendors.filter((vendor: Vendor) => vendor._id == _id)[0]

    const value = {
      name: editingVendor.name,
      email: editingVendor.email,
      address: editingVendor.address,
      phone: editingVendor.phone,
      orgId: editingVendor.orgId
    }

    this.editVendorForm.setValue(value);
  }

  onCancel() {
    this.editingId = "-1"
  }

  onDone() {
    if (!this.editVendorForm.dirty) {
      this.editingId = "-1";
      return;
    }

    // throw a toast for each invalid field
    if (!this.editVendorForm.valid) {
      for (const key of Object.keys(this.editVendorForm.value)) {
        const error = this.getErrorMessage(key)
        if (error) this.toastr.error(`Invalid ${key}. ${error}`);
      }
      return;
    }

    const updatedVendor: Vendor = {
      _id: this.editingId,
      name: this.editVendorForm.value.name!,
      email: this.editVendorForm.value.email!,
      address: this.editVendorForm.value.address!,
      phone: this.editVendorForm.value.phone!,
      orgId: this.editVendorForm.value.orgId!,
    }

    this.updateVendor.emit(updatedVendor)

    this.editingId = "-1";
  }

  onDelete(_id: string) {
    if (confirm("Are you sure want to delete this vendor"))
      this.deleteVendor.emit(_id)
  }

  getErrorMessage(controlName: string): string {
    const control = this.editVendorForm.get(controlName);

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
    if (control?.hasError('validPhoneNumber')) {
      return control.getError('validPhoneNumber').message;
    }

    return '';
  }

  // search
  search(e: Event) {
    this.searchSubject.next((e.target as HTMLInputElement).value);
  }

  performSearch(query: string) {
    if (!this._vends.length) this._vends = this.vendors;
    this.vendors = this._vends.filter((vend: Vendor) =>
      JSON.stringify(Object.values(vend))
        .toLowerCase()
        .includes(query)
    )
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
