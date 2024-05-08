import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { VendorsService } from '../../../services/vendors.service';
import { Store } from '@ngrx/store';
import { addVendorRequest, fetchVendorsRequest, updateVendorRequest } from '../../../store/vendor.actions';
import { vendorsSelector } from '../../../store/vendor.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { orgSelector } from '../../../../store/global.selectors';
import { deleteEmployeeRequest } from '../../../../employees/store/employees.actions';


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

  

  constructor(
        private vendorService: VendorsService,
        private store: Store<{ vendors: any, employees: any }>
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

  onAddVendor(event: any) {
    console.log("event: ", event);

    this.store.dispatch(addVendorRequest({vendor: event.vendor, orgId: this.orgId}))
  }

  onUpdateVendor(event: any) {
    console.log("event: ", event);
    this.store.dispatch(updateVendorRequest({vendor: event.vendor}));
  }
  
  onDeleteVendor(event: any) {
    console.log("event: ", event);
    this.store.dispatch(deleteEmployeeRequest({ _id: event._id }))
  }
}
