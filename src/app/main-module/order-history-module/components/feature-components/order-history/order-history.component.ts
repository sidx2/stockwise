import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteOrderRequest, fetchHistoryRequest, updateStatusRequest } from '../../../store/order-history.actions';
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

  showModal: boolean = false;
  modalMessage: string = "Are you sure want to delete this Order from history? It will be deleted permanently.";
  orderToDelete: string = "";

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

  onDeleteOrder(_id: string) {
    this.toggleModal();
    this.orderToDelete = _id;
  }
  
  toggleModal() {
    this.showModal = !this.showModal;
  }

  onConfirmDelete() {
    this.store.dispatch(deleteOrderRequest({ _id: this.orderToDelete }));
    this.toggleModal();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
