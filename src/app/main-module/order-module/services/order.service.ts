import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { orgSelector } from '../../../store/global.selectors';
import { IGlobalState } from '../../../models/global';
import { IPlaceOrder } from '../models/order';
import { Subject, takeUntil } from 'rxjs';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy {
  orgId!: string
  destroySubject = new Subject<void>();

  constructor(
    private http: HttpClient,
    private store: Store<{ global: IGlobalState }>
  ) {
      this.store.select(orgSelector).pipe(
        takeUntil(this.destroySubject),
      ).subscribe((org) => {
        this.orgId = org._id
      })
   }

  getProductVendors() {
    return this.http.post(`${BASE_URL}/vendor/productVendors`, {
      orgId: this.orgId
    })
  }

  placeOrder(order: IPlaceOrder) {
    return this.http.post(`${BASE_URL}/order/create`, order)
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
