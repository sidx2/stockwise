import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket, UpdateStatus } from '../models/ticket.model';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getUserTickets() {
    return this.http.get<Ticket[]>(`${BASE_URL}/ticket/userTickets`);
  }

  getAllTickets(orgId: string) {
    return this.http.get<Ticket[]>(`${BASE_URL}/ticket/${orgId}`);
  }

  updateTicketStatus(updatedStatus: UpdateStatus){
    return this.http.put<Ticket>(`${BASE_URL}/ticket/update`, updatedStatus);
  }

  createTicket(ticket: Ticket){
    return this.http.post<Ticket>(`${BASE_URL}/ticket/create`, ticket);
  }
}
