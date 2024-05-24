import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from '../../../../ticket-module/models/ticket.model';

@Component({
  selector: 'app-ticket-admin-card',
  templateUrl: './ticket-admin-card.component.html',
  styleUrl: './ticket-admin-card.component.scss'
})
export class TicketAdminCardComponent {

  @Input() ticket: Ticket | null = null
  @Output() updateStatusEmmiter: EventEmitter<string> = new EventEmitter();

  updateStatusHandler(ticketId: string){
    console.log("inside ticket admin card");
    this.updateStatusEmmiter.emit(ticketId);
  }
}
