import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckinDetails, CheckoutDetails, Item, UserAsset } from '../models/inventory';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getItems(orgId: string) {
    return this.http.get<Item[]>(`${BASE_URL}/inventory/${orgId}`); 
  }

  createItem(item: Item){
    return this.http.post<Item>(`${BASE_URL}/inventory/create`, item); 
  }

  updateItem(updatedItem: Item){
    return this.http.put<Item>(`${BASE_URL}/inventory/update`, {...updatedItem, itemId: updatedItem._id}); 
  }

  deleteItem(itemId: String){
    return this.http.delete<Item>(`${BASE_URL}/inventory/delete/${itemId}`); 
  }

  checkoutItem(assignedToDetails: CheckoutDetails ){
    return this.http.put<Item>(`${BASE_URL}/inventory/checkout`, assignedToDetails); 
  }

  checkinItem(checkinDetails: CheckinDetails){
    return this.http.put<Item>(`${BASE_URL}/inventory/checkin`, checkinDetails); 
  }

  getUserAsset(){
    return this.http.get<UserAsset[]>(`${BASE_URL}/inventory/item/getUserAssets`); 
  }
}
