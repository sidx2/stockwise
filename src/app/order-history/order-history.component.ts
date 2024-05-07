import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchHistoryRequest } from './store/order-history.actions';
import { historySelector } from './store/order-history.selectors';
import { orgSelector } from '../store/global.selectors';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  store = inject(Store<{ history: any, global: any }>);
  orgId: any
  history: any

  constructor() {
    this.store.select(orgSelector).subscribe((org) => {
      console.log("org in history: ", org)
      this.orgId = org._id;
    })
    
    this.store.dispatch(fetchHistoryRequest({_id: this.orgId}));
    this.store.select(historySelector).subscribe((data) => {
      console.log("data in history: ", data);
      this.history = data.history;
    })
  }
}
