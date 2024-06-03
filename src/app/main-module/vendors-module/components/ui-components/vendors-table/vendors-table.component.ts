import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vendor } from '../../../models/vendor';
import { IEmployeesState } from '../../../../employees-module/models/employee';
import { Editor } from '../../../models/vendor';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { User } from '../../../../../models/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customValidators } from '../../../../../shared-module/validators/customValidators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../../../../services/cookie.service';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrl: './vendors-table.component.scss'
})
export class VendorsTableComponent implements OnInit {
  @Input() vendors!: Vendor[]
  @Input() editors!: Editor[]

  @Output() startedEditing = new EventEmitter<Editor>();
  @Output() cancelledEditing = new EventEmitter<string>();
  @Output() changeVendor = new EventEmitter<Partial<Vendor>>();

  @Output() updateVendor = new EventEmitter<Vendor>();
  @Output() deleteVendor = new EventEmitter<string>();

  _vends: Vendor[] = [] // for search purpose
  visisble: boolean = false
  editingId: string = "-1"
  user!: User

  m_orgId!: string

  editVendorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    email: new FormControl('', [Validators.required, customValidators.validEmail]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    phone: new FormControl('', [Validators.required, customValidators.validPhoneNumber]),
    // orgId: new FormControl('')
  });

  psize: number = 10;
  currPage: number = 1;

  private searchSubject = new Subject<string>();
  destroySubject = new Subject<void>();

  constructor(
    private toastr: ToastrService,
    private cookieService: CookieService,
  ) {
    this.user = cookieService.getUser();

    this.searchSubject.pipe(
      debounceTime(500),  // 0.5 seconds
      takeUntil(this.destroySubject)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void { }


  onEdit(_id: string) {
    if (this.editingId != "-1") {
      this.cancelledEditing.emit(this.editingId);
    }

    this.editingId = _id
    const editingVendor: Vendor = this.vendors.filter((vendor: Vendor) => vendor._id == _id)[0]

    this.m_orgId = editingVendor.orgId

    const value = {
      name: editingVendor.name,
      email: editingVendor.email,
      address: editingVendor.address,
      phone: editingVendor.phone,
      // orgId: editingVendor.orgId
    }

    this.editVendorForm.setValue(value);

    this.startedEditing.emit({ vendorId: this.editingId, name: this.user.name, userId: this.user._id });
  }

  onCancel() {
    this.cancelledEditing.emit(this.editingId);
    this.editingId = "-1"
  }

  onDone() {
    if (!this.editVendorForm.dirty) {
      this.editingId = "-1";
      return;
    }
    
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
      orgId: this.m_orgId,
    }

    this.updateVendor.emit(updatedVendor)

    this.cancelledEditing.emit(this.editingId);
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

  // socket
  onVendorChanged(key: string, event: Event) {
    console.log("key event", key, event)

    this.changeVendor.emit({
      _id: this.editingId,
      [key]: event,
      orgId: this.m_orgId
    })
  }

  isEditingVendor(vendor: Vendor): Boolean {
    return this.editors.some((e) => e.vendorId === vendor._id);
  }

  getEditorName(vendor: Vendor): string {
    return this.editors.find((e) => e.vendorId == vendor._id)?.name ?? "";
  }

  // search
  search(e: Event) {
    this.searchSubject.next((e.target as HTMLInputElement).value);
  }

  performSearch(searchTerm: string) {
    if (!this._vends.length) this._vends = this.vendors;
    this.currPage = 1;
    this.vendors = this._vends.filter((vend: Vendor) =>
      JSON.stringify(Object.values(vend))
        .toLowerCase()
        .includes(searchTerm)
    )}

  ngOnDestroy(): void {
    this.cancelledEditing.emit(this.editingId);
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
