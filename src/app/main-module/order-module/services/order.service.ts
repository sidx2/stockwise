import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { orgSelector } from '../../../store/global.selectors';
import { IGlobalState } from '../../../models/global';
import { IPlaceOrder } from '../models/order';

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

  placeOrder(order: IPlaceOrder) {
    return this.http.post("http://localhost:9999/order/create", order)
  }
}
