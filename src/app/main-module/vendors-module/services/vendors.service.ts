import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../models/vendor';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {
  constructor(private http: HttpClient) { }

  fetchVendors() {
    return this.http.post(`${BASE_URL}/vendor/vendors`, {});
  }

  updateVendor(vendor: Vendor) {
    return this.http.put(`${BASE_URL}/vendor/update`, vendor);
  }

  deleteVendor(vendorId: string) {
    return this.http.delete(`${BASE_URL}/vendor/delete`, { body: { vendorId } });
  }

  addVendor(vendor: Vendor) {
    return this.http.post(`${BASE_URL}/vendor/create`, { ...vendor })
  }
  
  searchVendors(query: string) {
    return this.http.post(`${BASE_URL}/vendor/search`, { query })
  }
}
