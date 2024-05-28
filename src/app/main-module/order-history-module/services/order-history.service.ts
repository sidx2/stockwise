import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  constructor(
    private http: HttpClient,
  ) { }

  fetchHistory() {
    console.log("orgId in fetchhistory: ");
    return this.http.post(`${BASE_URL}/order/orders`, {});
  }

  updateStatus(status: string, orderId: string) {
    console.log("orgId in updatestatus: ", status, orderId);
    return this.http.post(`${BASE_URL}/order/${status}`, { id: orderId } )
  }

  deleteOrder(_id: string) {
    return this.http.delete(`${BASE_URL}/order/delete`, { body: { _id } });
  }
}
