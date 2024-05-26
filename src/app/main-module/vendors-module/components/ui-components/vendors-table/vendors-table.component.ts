import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vendor } from '../../../models/vendor';
import { IEmployeesState } from '../../../../employees-module/models/employee';
import { Editor } from '../../../models/vendor';
import { userSelector } from '../../../../../store/global.selectors';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IGlobalState, User } from '../../../../../models/global';

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

  m_name!: string
  m_email!: string
  m_address!: string
  m_phone!: string
  m_orgId!: string

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

    this.m_name = editingVendor.name
    this.m_email = editingVendor.email
    this.m_address = editingVendor.address
    this.m_phone = editingVendor.phone
    this.m_orgId = editingVendor.orgId

    this.startedEditing.emit({ vendorId: this.editingId, name: this.user.name, userId: this.user._id });
  }

  onCancel() {
    this.cancelledEditing.emit(this.editingId);
    this.editingId = "-1"
  }

  onDone() {
    if (!this.m_name || !this.m_email || !this.m_address || !this.m_phone) {
      alert("All fields are require");
      return;
    }

    this.updateVendor.emit({
      _id: this.editingId,
      name: this.m_name,
      email: this.m_email,
      address: this.m_address,
      phone: this.m_phone,
      orgId: this.m_orgId,
    })

    this.cancelledEditing.emit(this.editingId);
    this.editingId = "-1"
    console.log(this.m_name, this.m_email, this.m_address, this.m_phone)
  }

  onDelete(_id: string) {
    console.log("_id in onDelete", _id)
    if (confirm("Are you sure want to delete this vendor"))
      this.deleteVendor.emit(_id)
  }

  onVendorChanged(key: string, event: Event) {
    console.log(event)
    // this.changeVendor.emit({
    //   _id: this.editingId,
    //   [key]: event,
    //   orgId: this.m_orgId
    // })
    this.changeVendor.emit({
      _id: this.editingId,
      name: this.m_name,
      address: this.m_address,
      email: this.m_email,
      phone: this.m_phone,
      orgId: this.m_orgId
    })
  }

  isEditingVendor(vendor: Vendor): Boolean {
    return this.editors.some((e) => e.vendorId === vendor._id);
  }

  getEditorName(vendor: Vendor): string {
    return this.editors.find((e) => e.vendorId == vendor._id)?.name ?? "";
  }

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