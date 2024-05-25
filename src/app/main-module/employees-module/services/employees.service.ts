import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee, IAddEmployee } from '../models/employee';
import { orgSelector } from '../../../store/global.selectors';
import { IGlobalState } from '../../../models/global';
import { Subject, takeUntil } from 'rxjs';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService implements OnDestroy {
  orgId!: string
  destroySubject = new Subject<void>();

  constructor(
    private http: HttpClient,
    private store: Store<{ gloabl: IGlobalState }>,
  ) {
    this.store.select(orgSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((org) => {
      console.log("org in employee service is : ", org);
      this.orgId = org._id
    })

  }

  fetchEmployees() {
    console.log("orgId in fetchEmployees is : ", this.orgId)
    return this.http.get(`${BASE_URL}/org/employees/${this.orgId}`)
  }

  createUser(employee: IAddEmployee) {
    console.log("user in createUser(): ", employee);
    return this.http.post(`${BASE_URL}/user/createUser`, employee)
  }

  addEmployee(employeeId: Employee, orgId: string) {
    console.log("emp in addEmp: ", employeeId, "orgId: ", orgId);
    return this.http.post(`${BASE_URL}/org/add`, {
      employeeId: employeeId._id,
      orgId
    })
  }

  updateEmployee(employee: Employee) {
    console.log("emp in update: ", employee);
    return this.http.put(`${BASE_URL}/user/updateUser`, employee)
  }

  deleteEmployee(employeeId: string) {
    console.log("empId in update: ", employeeId);
    return this.http.delete(`${BASE_URL}/user/deleteUser`, { body: { _id: employeeId } })

  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
