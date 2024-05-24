import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vendor } from '../../../store/vendor.reducers';
import { IEmployeesState } from '../../../../employees-module/models/employee';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrl: './vendors-table.component.scss'
})
export class VendorsTableComponent {
  @Input() vendors!: Vendor[]
  @Input() editors!: string[]
  
  @Output() startedEditing = new EventEmitter<any>();
  @Output() cancelledEditing = new EventEmitter<any>();
  @Output() updateVendor = new EventEmitter<any>();
  @Output() changeVendor = new EventEmitter<any>();
  @Output() deleteVendor = new EventEmitter<any>();

  _vends: Vendor[] = []
  visisble:boolean = false
  editing: string = "-1"

  store = inject(Store<{ employees: IEmployeesState }>);

  m_name!: string
  m_email!: string
  m_address!: string
  m_phone!: string

  psize: number = 10;
  currPage: number = 1;

  onEdit(_id: string) {
    if (this.editing != "-1") {
      this.cancelledEditing.emit(this.editing);
    }
    this.editing = _id
    const editingEmp = this.vendors.filter((e: any) => e._id == _id)[0]

    console.log("editingEmp: ", editingEmp)
    this.m_name = editingEmp.name
    this.m_email = editingEmp.email
    this.m_address = editingEmp.address
    this.m_phone = editingEmp.phone

    this.startedEditing.emit(_id);
  }

  onCancel() {
    this.cancelledEditing.emit(this.editing);
    this.editing = "-1"
  }

  onDone() {
    if (!this.m_name || !this.m_email || !this.m_address || !this.m_phone) {
      alert("All fields are require");
      return;
    }

    this.updateVendor.emit({
      vendor: {
        _id: this.editing,
        name: this.m_name,
        email: this.m_email,
        address: this.m_address,
        phone: this.m_phone
      }
    })

    this.cancelledEditing.emit(this.editing);
    this.editing = "-1"
    console.log(this.m_name, this.m_email, this.m_address, this.m_phone)
  }

  onDelete(_id: string) {
    console.log("_id in onDelete", _id)
    if (confirm("Are you sure want to delete this vendor")) this.deleteVendor.emit({ _id })
  }

  onVendorChanged() {
    console.log("vendor changed");
    this.changeVendor.emit({
      vendor: {
        _id: this.editing,
        name: this.m_name,
        email: this.m_email,
        address: this.m_address,
        phone: this.m_phone
      }
    })
  }

  search(e: any) {
    if (!this._vends.length) this._vends = this.vendors
    this.currPage = 1;
    this.vendors = this._vends.filter((vend: Vendor) => JSON.stringify(vend).toLowerCase().includes(e.target.value))
  }
}
