import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheckinDetails, CheckoutDetails, Item, UserAsset } from '../models/inventory';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getItems(identificationType: string, categoryId: string, assignedStatus: string,  limit: number, skip: number, searchText: string, assetId: string) {

    let params = new HttpParams();

    if(identificationType) {
      params = params.set('identificationType', identificationType);
    }

    if(categoryId) {
      params = params.set('categoryId', categoryId);
    }

    if(assignedStatus !== '') {
      params = params.set('assignedStatus', assignedStatus);
    }

    if(assetId) {
      params = params.set('assetId', assetId);
    }

    if(limit) {
      params = params.set('limit', limit.toString());
    }

    if(skip) {
      params = params.set('skip', skip.toString());
    }

    if(searchText) {
      params = params.set('searchText', searchText);
    }

    return this.http.get<{items: Item[],totalItems: number}>(`${BASE_URL}/inventory/items_new`, { params: params });
}

  createItem(item: Item) {
    return this.http.post<Item>(`${BASE_URL}/inventory/create`, item);
  }

  createMultipleItem(item: Item) {
    let serialNumbers: string[] = [];

    if (item.serialNumber) {
      serialNumbers = item.serialNumber.split(',');
    }

    return this.http.post<Item[]>(`${BASE_URL}/inventory/createMultiple`, {
      itemDetails: item,
      serialNumbers
    });
  }


  updateItem(updatedItem: Item) {
    return this.http.put<Item>(`${BASE_URL}/inventory/update`, { ...updatedItem, itemId: updatedItem._id });
  }

  deleteItem(itemId: String) {
    return this.http.delete<Item>(`${BASE_URL}/inventory/delete/${itemId}`);
  }

  checkoutItem(assignedToDetails: CheckoutDetails) {
    return this.http.put<Item>(`${BASE_URL}/inventory/checkout`, assignedToDetails);
  }

  checkinItem(checkinDetails: CheckinDetails) {
    return this.http.put<Item>(`${BASE_URL}/inventory/checkin`, checkinDetails);
  }

  getUserAsset() {
    return this.http.get<UserAsset[]>(`${BASE_URL}/inventory/item/getUserAssets`);
  }
}
