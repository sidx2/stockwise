import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchHistoryRequest, updateStatusRequest } from '../../../store/order-history.actions';
import { historySelector } from '../../../store/order-history.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { IHistoryState } from '../../../store/order-history.reducers';
import { IGlobalState, Org } from '../../../../../store/global.reducers';
export interface Admin {
  name: string,
  email: string,
  role: string,
}

export interface CartItem {
  vendor: { name: string, _id: string },
  quantity: number,
  item: { _id: string, name: string, categoryId: string }
}

export interface Order {
  _id: string,
  org: Org,
  admin: Admin,
  cart: CartItem[],
  status: string,
  isActive: true,
  createdAt: Date
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  store = inject(Store<{ history: IHistoryState, global: IGlobalState }>);
  orgId!: string
  history: Order[] = []

  constructor() {
    this.store.select(orgSelector).subscribe((org) => {
      console.log("org in history: ", org)
      this.orgId = org._id;
    })

    this.store.dispatch(fetchHistoryRequest({ _id: this.orgId }));
    this.store.select(historySelector).subscribe((data) => {
      console.log("data in history: ", data);
      this.history = data.history;
    })
  }

  onStatusUpdate(event: any) {
    console.log("event:", event);
    this.store.dispatch(updateStatusRequest({ orderId: event.orderId, updatedStatus: event.updatedStatus }))
  }
}
