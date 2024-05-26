import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket, UpdateStatus } from '../models/ticket-admin';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TicketAdminService {

  constructor(private http: HttpClient) { }

  getAllTickets() {
    return this.http.get<Ticket[]>(`${BASE_URL}/ticket/allTickets`);
  }

  updateTicketStatus(updatedStatus: UpdateStatus){
    return this.http.put<Ticket>(`${BASE_URL}/ticket/update`, updatedStatus);
  }
}
