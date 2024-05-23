import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutMailDetails } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendCheckoutMail(checkoutMailDetails: CheckoutMailDetails) {
    return this.http.post<any>(`http://localhost:9999/service/sendMail`, checkoutMailDetails); 
  }
}