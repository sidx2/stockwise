import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BASE_URL } from '../../../constants/constants';
import { InventoryCount } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getInventoryCount(): Observable<InventoryCount[]> {
    console.log("request send to backend");
    console.log("URL:", `${BASE_URL}/inventory/item/getInventoryCounts`);
    return this.http.get<InventoryCount[]>(`${BASE_URL}/inventory/item/getInventoryCounts`).pipe(
      tap(response => console.log('API response:', response))
    );
  }
}
