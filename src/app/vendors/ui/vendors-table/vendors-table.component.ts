import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteVendorRequest, updateVendorRequest } from '../../store/vendor.actions';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrl: './vendors-table.component.scss'
})
export class VendorsTableComponent {
  @Input() vendors!: any

  _vends!: any

  visisble:boolean = false

  vendorForms: FormGroup[] = []
  editing: number = -1
  store = inject(Store<{ employees: any }>);

  m_name!: string
  m_email!: string
  m_address!: string
  m_phone!: any

  psize: number = 10;
  currPage: number = 1;

  ngOnInit(): void {
    if (this.vendors) {
      console.log("this.vendors: ", this.vendors)
      this._vends = this.vendors
      for (const e of this.vendors) {
        this.vendorForms.push(new FormGroup({
          name: new FormControl(e.name),
          email: new FormControl(e.email),
          address: new FormControl(e.address),
          phone: new FormControl(e.phone),
        }))
      }
    }

    console.log("this.employeesForms", this.vendorForms)
  }

  onEdit(_id: any) {
    this.editing = _id
    const editingEmp = this.vendors.filter((e: any) => e._id == _id)[0]

    console.log("editingEmp: ", editingEmp)
    this.m_name = editingEmp.name
    this.m_email = editingEmp.email
    this.m_address = editingEmp.address
    this.m_phone = editingEmp.phone
  }

  onCancel() {
    this.editing = -1
  }

  onDone() {
    this.store.dispatch(updateVendorRequest({
      vendor: {
        _id: this.editing,
        name: this.m_name,
        email: this.m_email,
        address: this.m_address,
        phone: this.m_phone
      }
    }))
    this.editing = -1
    console.log(this.m_name, this.m_email, this.m_address, this.m_phone)
  }

  onDelete(_id: any) {
    this.store.dispatch(deleteVendorRequest({ _id }))
  }

  onUpdate(e: any) {
    console.log("updating...", e)
  }

  search(e: any) {
    if (!this._vends.length) this._vends = this.vendors
    this.vendors = this._vends.filter((vend: any) => JSON.stringify(vend).toLowerCase().includes(e.target.value))
  }
}
