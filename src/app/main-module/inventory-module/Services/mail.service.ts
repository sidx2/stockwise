import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutMailDetails } from '../models/inventory';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendCheckoutMail(checkoutMailDetails: CheckoutMailDetails) {
    return this.http.post<any>(`${BASE_URL}/service/sendMail`, checkoutMailDetails); 
  }
}