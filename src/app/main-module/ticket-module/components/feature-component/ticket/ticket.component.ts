import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Ticket } from '../../../models/ticket.model';
import { UserAsset } from '../../../../inventory-module/models/inventory';
import { TicketState } from '../../../models/ticket.model';
import { InventoryState } from '../../../../inventory-module/models/inventory';
import { clearErrorMessage, createTicketRequest, createTicketSuccess, getUserTicketRequest } from '../../../store/ticket.action';
import { getUserAssets } from '../../../../inventory-module/store/inventory.action';
import { getErrorMessage, getLoading, ticketSelector } from '../../../store/ticket.selector';
import { usrAssetSelector } from '../../../../inventory-module/store/inventory.selector';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  tickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  userAssets$: Observable<UserAsset[]>;
  private destroy$: Subject<void> = new Subject();

  filterTag: string = 'all';
  isLoading: boolean = false;
  isTicketFormVisible: boolean = false;

  constructor(private store: Store<{tickets: TicketState, inventory: InventoryState}>, private toastr: ToastrService, private actions$: Actions) {
    this.tickets$ = this.store.pipe(select(ticketSelector));
    this.filteredTickets$ = this.tickets$;
    this.userAssets$ = this.store.pipe(select(usrAssetSelector));

    this.store.pipe(select(getErrorMessage), takeUntil(this.destroy$)).subscribe((errorMessage)=> {
      if(errorMessage){
        toastr.error(errorMessage);
        this.store.dispatch(clearErrorMessage())
      }
    })

    this.store.pipe(select(getLoading), takeUntil(this.destroy$))
    .subscribe((loading: boolean) => {
      this.isLoading = loading;
  });
 }

  ngOnInit(): void {
    this.store.dispatch(getUserTicketRequest());
    this.store.dispatch(getUserAssets());
    this.filteredTickets$ = this.tickets$

    this.actions$.pipe(ofType(createTicketSuccess), takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success("Ticket raised successfully");
      this.hideTicketForm();
    });
  }

  createTicketHandler(ticket: Ticket): void {
    this.store.dispatch(createTicketRequest({ ticket }));
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
