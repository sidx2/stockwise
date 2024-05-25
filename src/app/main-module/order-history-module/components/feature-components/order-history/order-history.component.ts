import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchHistoryRequest, updateStatusRequest } from '../../../store/order-history.actions';
import { historySelector } from '../../../store/order-history.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { IGlobalState } from '../../../../../store/global.reducers';
import { IHistoryState, IStatusUpdated, Order } from '../../../models/order-history';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  orgId!: string
  history: Order[] = []

  constructor(
    private store: Store<{ history: IHistoryState, global: IGlobalState }>
  ) {
    this.store.select(orgSelector).subscribe((org) => { this.orgId = org._id; })
    this.store.dispatch(fetchHistoryRequest({ _id: this.orgId }));
    this.store.select(historySelector).subscribe((data) => { this.history = data.history; })
  }

  onStatusUpdate(event: IStatusUpdated) {
    this.store.dispatch(updateStatusRequest({ 
      orderId: event.orderId, 
      updatedStatus: event.updatedStatus 
    }))
  }
}
