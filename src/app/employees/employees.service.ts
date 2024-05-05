import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { orgSelector } from "../store/global.selectors"

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  http = inject(HttpClient)
  store = inject(Store<{ gloabl: any }>);
  orgId!: string
  constructor(
    ) {
    this.store.select(orgSelector).subscribe((org) =>  {
      console.log("org in employee service is : ", org);
      this.orgId = org._id
    })

   }

  fetchEmployees() {
    console.log("orgId in fetchEmployees is : ", this.orgId)
    return this.http.get(`http://localhost:9999/org/employees/${this.orgId}`)
  }
}
