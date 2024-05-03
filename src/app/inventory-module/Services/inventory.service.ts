import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getItems() {
    const orgId = '660e20d70b44fcba1ea33139';
    return this.http.get<Item[]>(`http://localhost:9999/inventory/${orgId}`); 
  }

  createItem(item: Item){
    return this.http.post<Item>(`http://localhost:9999/inventory/create`, item); 
  }

  updateItem(updatedItem: Item){
    return this.http.put<Item>(`http://localhost:9999/inventory/update`, {...updatedItem, itemId: updatedItem._id}); 
  }

  deleteItem(itemId: String){
    return this.http.delete<Item>(`http://localhost:9999/inventory/delete/${itemId}`); 
  }
}
