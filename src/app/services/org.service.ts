import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  userId;
  constructor(private cs: CookieService, private http: HttpClient) { 
      try {
        this.userId = JSON.parse(this.cs.get("user")).id
      }
      catch(e) {
        console.log(e)
      }
  }

  getOrgByUserId(userId: string) {
      return this.http.get("http://localhost:9999/org/getOrg/")
  }
}
