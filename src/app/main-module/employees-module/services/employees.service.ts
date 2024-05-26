import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IAddEmployee } from '../models/employee';
import { Subject } from 'rxjs';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  destroySubject = new Subject<void>();

  constructor(
    private http: HttpClient,
  ) {}

  fetchEmployees() {
    console.log("orgId in fetchEmployees is : ")
    return this.http.get(`${BASE_URL}/org/employees/`)
  }

  createUser(employee: IAddEmployee) {
    console.log("user in createUser(): ", employee);
    return this.http.post(`${BASE_URL}/user/createUser`, employee)
  }

  addEmployee(employee: Employee) {
    console.log("emp in addEmp: ", employee, "orgId: ");
    return this.http.post(`${BASE_URL}/org/add`, { employeeId: employee._id })
  }

  updateEmployee(employee: Employee) {
    console.log("emp in update: ", employee);
    return this.http.put(`${BASE_URL}/user/updateUser`, employee)
  }

  deleteEmployee(employeeId: string) {
    console.log("empId in update: ", employeeId);
    return this.http.delete(`${BASE_URL}/user/deleteUser`, { body: { _id: employeeId } })

  }
}
