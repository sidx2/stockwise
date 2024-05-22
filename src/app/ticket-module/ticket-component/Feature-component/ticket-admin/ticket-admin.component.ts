import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Ticket, UpdateStatus } from '../../../models/ticket.model';
import { UserAsset } from '../../../../inventory-module/models/inventory';
import { TicketState } from '../../../store/ticket.reducer';
import { InventoryState } from '../../../../inventory-module/store/inventory.reducer';
import { Store } from '@ngrx/store';
import { getAllTicketRequest, updateTicketStatusRequest } from '../../../store/ticket.action';
import { LoaderService } from '../../../../share-module/services/loader.service';

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

  selectedTicket: Ticket | null = null
  orgId: string = '';
  isTicketFormVisible: boolean = false;
  filterTag: string = 'all';
  isUpdateFormVisible: boolean = false;

  constructor(private store: Store<{ global: any, tickets: TicketState, inventory: InventoryState }>, public loaderService: LoaderService) {
    this.tickets$ = this.store.select(state => state.tickets.allTickets);
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

  showUpdateStatusForm(ticket: Ticket){
    this.selectedTicket = ticket;
    this.isUpdateFormVisible = true;
  }

  hideUpdateStatusForm(){
    this.selectedTicket = null;
    this.isUpdateFormVisible = false
  }

  updateStatusHandler(updatedStatus: UpdateStatus){
    updatedStatus.ticketId = this.selectedTicket?._id;
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
