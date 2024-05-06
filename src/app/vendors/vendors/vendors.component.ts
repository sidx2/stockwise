import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { VendorsService } from '../vendors.service';
import { Store } from '@ngrx/store';
import { addVendorRequest, fetchVendorsRequest } from '../store/vendor.actions';
import { vendorsSelector } from '../store/vendor.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { orgSelector } from '../../store/global.selectors';


export interface Vendor {
    name?: string,
    email?: string,
    address?: string,
}

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent {
  vendors!: Vendor[];
  _vendors!: Vendor[];

    visible: boolean = false
  cdr = inject(ChangeDetectorRef)

  orgId: any

  selectedVendors!: Vendor[];

  addVendorForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
  })

  constructor(
        private vendorService: VendorsService,
        private store: Store<{ vendors: any }>
    ) {
        this.store.dispatch(fetchVendorsRequest());

        this.store.select(vendorsSelector).subscribe(vendors => {
            console.log("vendors in vendors: ", vendors)
            this.vendors = vendors;
            this._vendors = vendors;
        })

        this.store.select(orgSelector).subscribe((org) => {
            console.log("org in employees component: ", org);
            this.orgId = org._id
          })
  }



  showDialog() {
    this.visible = !this.visible
  }

  onAddVendor() {
    console.log("data: ", this.addVendorForm.value);
    this.visible = !this.visible

    this.store.dispatch(addVendorRequest({vendor: this.addVendorForm.value, orgId: this.orgId}))
  }
}
