import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee, IAddEmployee } from '../models/employee';
import { orgSelector } from '../../../store/global.selectors';
import { IGlobalState } from '../../../models/global';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  orgId!: string
  constructor(
    private http: HttpClient,
    private store: Store<{ gloabl: IGlobalState }>,
  ) {
    this.store.select(orgSelector).subscribe((org) => {
      console.log("org in employee service is : ", org);
      this.orgId = org._id
    })

  }

  fetchEmployees() {
    console.log("orgId in fetchEmployees is : ", this.orgId)
    return this.http.get(`http://localhost:9999/org/employees/${this.orgId}`)
  }

  createUser(employee: IAddEmployee) {
    console.log("user in createUser(): ", employee);
    return this.http.post("http://localhost:9999/user/createUser", employee)
  }

  addEmployee(employeeId: Employee, orgId: string) {
    console.log("emp in addEmp: ", employeeId, "orgId: ", orgId);
    return this.http.post("http://localhost:9999/org/add", {
      employeeId: employeeId._id,
      orgId
    })
  }

  updateEmployee(employee: Employee) {
    console.log("emp in update: ", employee);
    return this.http.put("http://localhost:9999/user/updateUser", employee)
  }

  deleteEmployee(employeeId: string) {
    console.log("empId in update: ", employeeId);
    return this.http.delete("http://localhost:9999/user/deleteUser", { body: { _id: employeeId } })

  }
}
