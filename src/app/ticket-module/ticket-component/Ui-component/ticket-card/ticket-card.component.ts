import { Component, Input } from '@angular/core';
import { Ticket } from '../../../models/ticket.model';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent {
  @Input() ticket: Ticket | null = null
}
