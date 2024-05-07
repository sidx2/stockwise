import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


enum Estatus {
  "placed",
  "fulfilled",
  "pending",
  "rejected"
}

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  http = inject(HttpClient)
  constructor() { }

  fetchHistory(orgId: any) {
    console.log("orgId in fetchhistory: ", orgId);
    return this.http.post("http://localhost:9999/order/orders", { orgId } )
  }

  markFulfilled(status: any, orderId: any) {
    console.log("orgId in updatestatus: ", status, orderId);
    return this.http.post(`http://localhost:9999/order/${status}`, { id: orderId } )
  }
}
