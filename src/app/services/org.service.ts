import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  userId;
  constructor(private cs: CookieService, private http: HttpClient) { 
      try {
        this.userId = JSON.parse(this.cs.get("user") || "{}")._id
      }
      catch(e) {
        console.log(e)
      }
  }

  getOrgByUserId(userId: string) {
    return this.http.get(`${BASE_URL}/org/getOrg/`)
  }
}
