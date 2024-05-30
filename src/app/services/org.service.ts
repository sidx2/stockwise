import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  constructor(private http: HttpClient) { }

  getOrgByUserId() {
    return this.http.get(`${BASE_URL}/org/getOrg/`)
  }
}
