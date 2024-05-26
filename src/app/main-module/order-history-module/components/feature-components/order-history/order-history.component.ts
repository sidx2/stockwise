import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchHistoryRequest, updateStatusRequest } from '../../../store/order-history.actions';
import { historyStateSelector } from '../../../store/order-history.selectors';
import { IHistoryState, IStatusUpdated, Order } from '../../../models/order-history';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnDestroy {
  history: Order[] = [];
  isLoading: boolean = false;

  destroySubject = new Subject<void>();

  constructor(
    private store: Store<{ history: IHistoryState }>
  ) {
    this.store.dispatch(fetchHistoryRequest());

    this.store.select(historyStateSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((state) => {
      this.history = state.history;
      this.isLoading = state.isLoading;
    });
  }

  onStatusUpdate(event: IStatusUpdated) {
    this.store.dispatch(updateStatusRequest({
      _id: event._id,
      updatedStatus: event.updatedStatus
    }))
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
