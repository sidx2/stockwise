import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  constructor(
    private http: HttpClient,
  ) { }

  fetchHistory(orgId: string) {
    console.log("orgId in fetchhistory: ", orgId);
    return this.http.post("http://localhost:9999/order/orders", { orgId } )
  }

  markFulfilled(status: string, orderId: string) {
    console.log("orgId in updatestatus: ", status, orderId);
    return this.http.post(`http://localhost:9999/order/${status}`, { id: orderId } )
  }
}
