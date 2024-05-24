import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { UserAsset } from '../../../../inventory-module/models/inventory';
import { TicketAdminState, Ticket, UpdateStatus } from '../../../models/ticket-admin';
import { InventoryState } from '../../../../inventory-module/models/inventory';
import { Store, select } from '@ngrx/store';
import { getAllTicketRequest, updateTicketStatusRequest } from '../../../store/ticket-admin.action';
import { getLoading, ticketSelector } from '../../../store/ticket-admin.selector';
import { usrAssetSelector } from '../../../../inventory-module/store/inventory.selector';
import { orgSelector } from '../../../../../store/global.selectors';

@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrl: './ticket-admin.component.scss'
})
export class TicketAdminComponent {
  tickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  userAssets$: Observable<UserAsset[]>;
  private orgSubscription!: Subscription;
  loadingSubscription!: Subscription;

  selectedTicketId: string = '';
  orgId: string = '';
  filterTag: string = 'all';

  isLoading: boolean = false;
  isTicketFormVisible: boolean = false;
  isUpdateFormVisible: boolean = false;

  constructor(private store: Store<{ global: any, ticketsAdmin: TicketAdminState, inventory: InventoryState }>) {
    this.tickets$ = this.store.pipe(select(ticketSelector));
    this.filteredTickets$ = this.tickets$
    this.userAssets$ = this.store.pipe(select(usrAssetSelector));

    this.loadingSubscription = this.store.pipe(select(getLoading)).subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this.orgSubscription = this.store.pipe(select(orgSelector)).subscribe((org) => {
      this.orgId = org._id;
    })
  }

  ngOnInit(): void {
    
    this.filteredTickets$ = this.tickets$;
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

  ngOnDestroy(): void {
    this.orgSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
