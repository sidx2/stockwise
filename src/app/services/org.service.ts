import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '../store/global.selectors';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  http = inject(HttpClient)
  cs = inject(CookieService)
  userId;
  constructor() { 
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
