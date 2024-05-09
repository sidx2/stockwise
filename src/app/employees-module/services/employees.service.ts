import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { orgSelector } from "../../store/global.selectors"

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

  createUser(user: any) {
    console.log("user in createUser(): ", user);
    return this.http.post("http://localhost:9999/user/createUser", user)
  }

  addEmployee(emp: any, orgId: any) {
    console.log("emp in addEmp: ", emp, "orgId: ", orgId);
    return this.http.post("http://localhost:9999/org/add", {
      employeeId: emp._id,
      orgId
    })
  }

  updateEmployee(emp: any) {
    console.log("emp in update: ", emp);
    return this.http.put("http://localhost:9999/user/updateUser", emp.employee)
  }
  
  deleteEmployee(emp: any) {
    console.log("emp in update: ", emp);
    return this.http.delete("http://localhost:9999/user/deleteUser", { body: { _id: emp } })

  }
}