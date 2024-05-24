import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { orgSelector } from '../../../store/global.selectors';
import { IGlobalState } from '../../../models/global';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orgId!: string

  constructor(
    private http: HttpClient,
    private store: Store<{ global: IGlobalState }>
  ) {
      this.store.select(orgSelector).subscribe((org) => {
        this.orgId = org._id
      })
   }

  getProductVendors() {
    return this.http.post("http://localhost:9999/vendor/productVendors", {
      orgId: this.orgId
    })
  }

  placeOrder(order: any) {
    return this.http.post("http://localhost:9999/order/create", order)
  }
}
