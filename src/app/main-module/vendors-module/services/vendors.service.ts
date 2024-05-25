import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { orgSelector } from '../../../store/global.selectors';
import { Vendor } from '../store/vendor.reducers';
import { IGlobalState } from '../../../models/global';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(
    private http: HttpClient,
    private store: Store<{ global: IGlobalState }>,
  ) { }

  getVendors() {
    
  }

  fetchVendors() {
    return this.store.pipe(
      select(orgSelector),
      switchMap(org => {
        console.log("org in vendor service: ", org);
        return this.http.post(`${BASE_URL}/vendor/vendors`, { orgId: org._id });
      })
    );
  }

  updateVendor(vendor: Vendor) {
    console.log("vendor in updateVendor: ", vendor)
    return this.http.put(`${BASE_URL}/vendor/update`, vendor);
  }
  
  deleteVendor(vendorId: string) {
    console.log("vendor in deleteVendor: ", vendorId)
    return this.http.delete(`${BASE_URL}/vendor/delete`, { body: { vendorId } });
    
  }
  
  addVendor(vendor: Vendor, orgId: string) {
    console.log("vendor orgId ", vendor, orgId)
    return this.http.post(`${BASE_URL}/vendor/create`, {
      ...vendor,
      orgId
    })

  }
}
