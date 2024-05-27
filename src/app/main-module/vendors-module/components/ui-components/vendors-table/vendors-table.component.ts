import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vendor } from '../../../models/vendor';
import { IEmployeesState } from '../../../../employees-module/models/employee';
import { Editor } from '../../../models/vendor';
import { userSelector } from '../../../../../store/global.selectors';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IGlobalState, User } from '../../../../../models/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    orgId: new FormControl('')
  });

  psize: number = 10;
  currPage: number = 1;

  private searchSubject = new Subject<string>();
  destroySubject = new Subject<void>();

  constructor(
    private store: Store<{ global: IGlobalState, employees: IEmployeesState }>,
  ) {
    this.store.select(userSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((user) => {
      this.user = user as User
    })

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
      orgId: editingVendor.orgId
    }

    this.editVendorForm.setValue(value);

    this.startedEditing.emit({ vendorId: this.editingId, name: this.user.name, userId: this.user._id });
  }

  onCancel() {
    this.cancelledEditing.emit(this.editingId);
    this.editingId = "-1"
  }

  onDone() {
    if (!this.editVendorForm.valid) {
      alert("Invalid input for updating vendor!");
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

    this.cancelledEditing.emit(this.editingId);
    this.editingId = "-1"
  }

  onDelete(_id: string) {
    console.log("_id in onDelete", _id)
    if (confirm("Are you sure want to delete this vendor"))
      this.deleteVendor.emit(_id)
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
      JSON.stringify(vend)
        .toLowerCase()
        .includes(searchTerm)
    )}

  ngOnDestroy(): void {
    this.cancelledEditing.emit(this.editingId);
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
