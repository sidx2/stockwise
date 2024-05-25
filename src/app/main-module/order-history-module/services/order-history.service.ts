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

  fetchHistory(orgId: string) {
    console.log("orgId in fetchhistory: ", orgId);
    return this.http.post(`${BASE_URL}/order/orders`, { orgId } )
  }

  markFulfilled(status: string, orderId: string) {
    console.log("orgId in updatestatus: ", status, orderId);
    return this.http.post(`${BASE_URL}/order/${status}`, { id: orderId } )
  }
}
