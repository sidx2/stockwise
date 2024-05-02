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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';

    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return this.http.get<Item[]>(`http://localhost:9999/inventory/${orgId}`, headers); 
  }

  createItem(item: Item){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';

    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return this.http.post<Item>(`http://localhost:9999/inventory/create`, item, headers); 
  }

  updateItem(updatedItem: Item){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';

    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return this.http.put<Item>(`http://localhost:9999/inventory/update`, {...updatedItem, itemId: updatedItem._id}, headers); 
  }

  deleteItem(itemId: String){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';  
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return this.http.delete<Item>(`http://localhost:9999/inventory/delete/${itemId}`,  headers); 
  }
}
