import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchHistoryRequest, updateStatusRequest } from './store/order-history.actions';
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

  editing = -1
  m_status!:any

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

  edit(_id:any) {
    if (_id == -1) {
      this.editing = -1;
      return;
    }
    this.editing = _id
    this.m_status = this.history.filter((h:any) => h._id == _id)[0].status
  }

  onStatusUpdate(updatedStatus: any) {
    console.log(updatedStatus);
    this.store.dispatch(updateStatusRequest({orderId: this.editing, updatedStatus}))
    this.edit(-1);
  }
}
