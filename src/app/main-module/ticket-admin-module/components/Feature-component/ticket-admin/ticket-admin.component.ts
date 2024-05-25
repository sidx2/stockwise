import { Component } from '@angular/core';
import { Observable, Subscription, filter, map } from 'rxjs';
import { UserAsset, Item } from '../../../../inventory-module/models/inventory';
import { TicketAdminState, Ticket, UpdateStatus } from '../../../models/ticket-admin';
import { InventoryState } from '../../../../inventory-module/models/inventory';
import { Store, select } from '@ngrx/store';
import { getAllTicketRequest, updateTicketStatusRequest } from '../../../store/ticket-admin.action';
import { getLoading, ticketSelector } from '../../../store/ticket-admin.selector';
import { inventorySelector, usrAssetSelector } from '../../../../inventory-module/store/inventory.selector';
import { orgSelector } from '../../../../../store/global.selectors';
import { getItemRequest } from '../../../../inventory-module/store/inventory.action';

@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrl: './ticket-admin.component.scss'
})
export class TicketAdminComponent {
  tickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  items$: Observable<Item[]>;
  private orgSubscription!: Subscription;
  loadingSubscription!: Subscription;

  selectedTicketId: string = '';
  selectedItem: Item | null = null;
  orgId: string = '';
  filterTag: string = 'all';

  isLoading: boolean = false;
  isTicketFormVisible: boolean = false;
  isUpdateFormVisible: boolean = false;
  isAssetInfoVisible: boolean = false;

  constructor(private store: Store<{ global: any, ticketsAdmin: TicketAdminState, inventory: InventoryState }>) {
    this.tickets$ = this.store.pipe(select(ticketSelector));
    this.filteredTickets$ = this.tickets$
    this.items$ = this.store.pipe(select(inventorySelector));

    this.loadingSubscription = this.store.pipe(select(getLoading)).subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this.orgSubscription = this.store.pipe(select(orgSelector)).subscribe((org) => {
      this.orgId = org._id;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(getAllTicketRequest({orgId: this.orgId}))
    this.filteredTickets$ = this.tickets$;
    this.store.dispatch(getItemRequest({orgId:this.orgId}))
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

  showUpdateStatusForm(ticketId: string){
    this.selectedTicketId = ticketId;
    this.isUpdateFormVisible = true;
  }

  hideUpdateStatusForm(){
    this.selectedTicketId = '';
    this.isUpdateFormVisible = false
  }

  updateStatusHandler(updatedStatus: UpdateStatus){
    updatedStatus.ticketId = this.selectedTicketId;
    this.store.dispatch(updateTicketStatusRequest({updatedStatus}));
    console.log("updated status recieved", updatedStatus)
    this.hideUpdateStatusForm()
  }

  showAssetInfo(assetId: string){
    this.items$.pipe(
      map(items => items.find(item => item._id === assetId))
    ).subscribe(selectedItem => {
      if (selectedItem) {
        this.selectedItem = selectedItem;
      }
    });
    this.isAssetInfoVisible = true;
  }

  hideAssetInfo(){
    this.selectedItem = null;
    this.isAssetInfoVisible = false;
  }

  ngOnDestroy(): void {
    this.orgSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
