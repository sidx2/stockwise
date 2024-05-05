import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket, UpdateStatus } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getUserTickets() {
    return this.http.get<Ticket[]>(`http://localhost:9999/ticket/userTickets`);
  }

  getAllTickets(orgId: string) {
    return this.http.get<Ticket[]>(`http://localhost:9999/ticket/${orgId}`);
  }

  updateTicketStatus(updatedStatus: UpdateStatus){
    return this.http.put<Ticket>(`http://localhost:9999/ticket/update`, updatedStatus);
  }

  createTicket(ticket: Ticket){
    return this.http.post<Ticket>(`http://localhost:9999/ticket/create`, ticket);
  }
}
