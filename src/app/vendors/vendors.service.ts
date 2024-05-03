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
}
