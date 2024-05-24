import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Ticket } from '../../../models/ticket-admin';
import { UserAsset } from '../../../../inventory-module/models/inventory';
import { TicketAdminState } from '../../../store/ticket-admin.reducer';
import { InventoryState } from '../../../../inventory-module/store/inventory.reducer';
import { Store } from '@ngrx/store';
import { getAllTicketRequest, updateTicketStatusRequest } from '../../../store/ticket-admin.action';
import { UpdateStatus } from '../../../models/ticket-admin';

@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrl: './ticket-admin.component.scss'
})
export class TicketAdminComponent {
  tickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  userAssets$: Observable<UserAsset[]>;
  private orgSubscription: Subscription | undefined;

  selectedTicketId: string = '';
  orgId: string = '';
  isTicketFormVisible: boolean = false;
  filterTag: string = 'all';
  isUpdateFormVisible: boolean = false;

  constructor(private store: Store<{ global: any, ticketsAdmin: TicketAdminState, inventory: InventoryState }>) {
    this.tickets$ = this.store.select(state => state.ticketsAdmin.allTickets);
    this.filteredTickets$ = this.tickets$
    this.userAssets$ = this.store.select(state => state.inventory.userAssets);
  }

  ngOnInit(): void {
    this.orgSubscription = this.store.select('global').subscribe((global) => {
      this.orgId = global.org._id;
      this.store.dispatch(getAllTicketRequest({orgId: this.orgId}));
    });

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
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }
}
