import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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
}
