import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlaceOrder } from '../models/order';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getProductVendors() {
    return this.http.post(`${BASE_URL}/vendor/productVendors`, {})
  }

  placeOrder(order: IPlaceOrder) {
    return this.http.post(`${BASE_URL}/order/create`, order)
  }
}
