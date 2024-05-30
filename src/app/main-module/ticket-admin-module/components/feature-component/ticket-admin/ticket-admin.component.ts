import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, map, Subject } from 'rxjs';
import { UserAsset, Item } from '../../../../inventory-module/models/inventory';
import { TicketAdminState, Ticket, UpdateStatus } from '../../../models/ticket-admin';
import { InventoryState } from '../../../../inventory-module/models/inventory';
import { Store, select } from '@ngrx/store';
import { clearErrorMessage, getAllTicketRequest, updateTicketStatusRequest, updateTicketStatusSuccess } from '../../../store/ticket-admin.action';
import { getErrorMessage, getLoading, ticketSelector } from '../../../store/ticket-admin.selector';
import { inventorySelector } from '../../../../inventory-module/store/inventory.selector';
import { getItemRequest } from '../../../../inventory-module/store/inventory.action';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrl: './ticket-admin.component.scss'
})
export class TicketAdminComponent implements OnInit, OnDestroy {
  tickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  items$: Observable<Item[]>;
  private destroy$: Subject<void> = new Subject();

  selectedTicketId: string = '';
  selectedItem: Item | null = null;
  filterTag: string = 'all';

  isLoading: boolean = false;
  isTicketFormVisible: boolean = false;
  isUpdateFormVisible: boolean = false;
  isAssetInfoVisible: boolean = false;

  constructor(private store: Store<{ticketsAdmin: TicketAdminState, inventory: InventoryState }>, private toastr: ToastrService, private actions$: Actions) {

    this.tickets$ = this.store.pipe(select(ticketSelector));
    this.filteredTickets$ = this.tickets$
    this.items$ = this.store.pipe(select(inventorySelector));

    this.store.pipe(select(getLoading))
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this.store.pipe(select(getErrorMessage), takeUntil(this.destroy$)).subscribe((errorMessage) => {
      if (errorMessage) {
        toastr.error(errorMessage);
        this.store.dispatch(clearErrorMessage())
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(getAllTicketRequest())
    this.filteredTickets$ = this.tickets$;
    this.store.dispatch(getItemRequest())

    this.actions$.pipe(ofType(updateTicketStatusSuccess), takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success("Ticket status updated successfully");
      this.hideUpdateStatusForm()
    });
  }

  handleFilterChange(filterTag: string): void {
    this.filterTag = filterTag;
    this.filteredTickets$ = this.tickets$.pipe(
      map(tickets => {
        let updatedTickets: Ticket[] = [];
        if (filterTag === 'all') {
          updatedTickets = tickets;
        } else if (filterTag === 'new') {
          updatedTickets = tickets.filter(ticket => ticket.status === 'open');
        } else {
          updatedTickets = tickets.filter(ticket => ticket.status === filterTag);
        }
        return updatedTickets;
      })
    );
  }

  showUpdateStatusForm(ticketId: string) {
    this.selectedTicketId = ticketId;
    this.isUpdateFormVisible = true;
  }

  hideUpdateStatusForm() {
    this.selectedTicketId = '';
    this.isUpdateFormVisible = false
  }

  updateStatusHandler(updatedStatus: UpdateStatus) {
    updatedStatus.ticketId = this.selectedTicketId;
    this.store.dispatch(updateTicketStatusRequest({ updatedStatus }));
    console.log("updated status recieved", updatedStatus)
  }

  showAssetInfo(assetId: string) {
    this.items$.pipe(
      map(items => items.find(item => item._id === assetId)),
      takeUntil(this.destroy$)
    ).subscribe(selectedItem => {
      if (selectedItem) {
        console.log("selected item", selectedItem)
        this.selectedItem = selectedItem;
      }
    });
    this.isAssetInfoVisible = true;
  }

  hideAssetInfo() {
    this.selectedItem = null;
    this.isAssetInfoVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
