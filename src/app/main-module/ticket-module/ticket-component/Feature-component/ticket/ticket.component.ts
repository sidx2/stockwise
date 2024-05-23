import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ticket } from '../../../models/ticket.model';
import { UserAsset } from '../../../../inventory-module/models/inventory';
import { TicketState } from '../../../store/ticket.reducer';
import { InventoryState } from '../../../../inventory-module/store/inventory.reducer';
import { createTicketRequest, getUserTicketRequest } from '../../../store/ticket.action';
import { getUserAssets } from '../../../../inventory-module/store/inventory.action';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  tickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  userAssets$: Observable<UserAsset[]>;
  private orgSubscription: Subscription | undefined;

  orgId: string = '';
  isTicketFormVisible: boolean = false;
  filterTag: string = 'all';

  constructor(private store: Store<{ global: any, tickets: TicketState, inventory: InventoryState}>) {
    this.tickets$ = this.store.select(state => state.tickets.userTickets);
    this.filteredTickets$ = this.tickets$
    this.userAssets$ = this.store.select( state => state.inventory.userAssets);
 }

  ngOnInit(): void {
    this.orgSubscription = this.store.select('global').subscribe((global) => {
      this.orgId = global.org._id;
    });

    this.store.dispatch(getUserTicketRequest());
    this.store.dispatch(getUserAssets());

    this.filteredTickets$ = this.tickets$;
  }

  createTicketHandler(ticket: Ticket): void {
    ticket.orgId = this.orgId;
    console.log("ticket data received", ticket);
    this.store.dispatch(createTicketRequest({ ticket }));
    this.hideTicketForm();
  }

  showTicketForm(): void {
    this.isTicketFormVisible = true;
  }

  hideTicketForm(): void {
    this.isTicketFormVisible = false;
  }

  handleFilterChange(filterTag: string): void {
    this.filterTag = filterTag;
    this.filteredTickets$ = this.tickets$.pipe(
      map(tickets => {
        let updatedTickets: Ticket[] = [];
        if (filterTag === 'all') {
          updatedTickets = tickets;
        } else if (filterTag === 'active') {
          updatedTickets = tickets.filter(ticket => ticket.status === 'open' || ticket.status === 'processing');
        } else {
          updatedTickets = tickets.filter(ticket => ticket.status === filterTag);
        }
        return updatedTickets;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }
}
