import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { orgSelector, userSelector } from '../store/global.selectors';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(
    private http: HttpClient,
    private store: Store<{ global: any }>
  ) { }

  getVendors() {
    
  }

  fetchVendors() {
    return this.store.pipe(
      select(orgSelector),
      switchMap(org => {
        console.log("org in vendor service: ", org);
        return this.http.post('http://localhost:9999/vendor/vendors', { orgId: org._id });
      })
    );
  }

  updateVendor(vendor: any) {
    console.log("vendor in updateVendor: ", vendor)
    return this.http.put("http://localhost:9999/vendor/update", vendor.vendor);
  }
  
  deleteVendor(vendorId: any) {
    console.log("vendor in deleteVendor: ", vendorId)
    return this.http.delete("http://localhost:9999/vendor/delete", { body: { vendorId } });
    
  }
  
  addVendor(vendor: any, orgId: any) {
    console.log("vendor orgId ", vendor, orgId)
    return this.http.post("http://localhost:9999/vendor/create", {
      ...vendor,
      orgId
    })

  }
}
