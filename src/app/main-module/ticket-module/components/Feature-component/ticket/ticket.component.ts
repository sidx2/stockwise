import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Ticket } from '../../../models/ticket.model';
import { UserAsset } from '../../../../inventory-module/models/inventory';
import { TicketState } from '../../../models/ticket.model';
import { InventoryState } from '../../../../inventory-module/models/inventory';
import { createTicketRequest, getUserTicketRequest } from '../../../store/ticket.action';
import { getUserAssets } from '../../../../inventory-module/store/inventory.action';
import { getLoading, ticketSelector } from '../../../store/ticket.selector';
import { usrAssetSelector } from '../../../../inventory-module/store/inventory.selector';
import { orgSelector } from '../../../../../store/global.selectors';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  tickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  userAssets$: Observable<UserAsset[]>;
  private orgSubscription!: Subscription;
  loadingSubscription!: Subscription;

  orgId: string = '';
  filterTag: string = 'all';
  isLoading: boolean = false;
  isTicketFormVisible: boolean = false;

  constructor(private store: Store<{ global: any, tickets: TicketState, inventory: InventoryState}>) {
    this.tickets$ = this.store.pipe(select(ticketSelector));
    this.filteredTickets$ = this.tickets$;
    this.userAssets$ = this.store.pipe(select(usrAssetSelector));
    
    this.orgSubscription = this.store.pipe(select(orgSelector)).subscribe((org) => {
      this.orgId = org._id;
    })
 }

  ngOnInit(): void {
  
    this.store.dispatch(getUserTicketRequest());
    this.store.dispatch(getUserAssets());
    this.filteredTickets$ = this.tickets$;

    this.loadingSubscription = this.store.pipe(select(getLoading)).subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
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
    this.orgSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
