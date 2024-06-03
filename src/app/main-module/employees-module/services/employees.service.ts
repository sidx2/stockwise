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
    return this.http.get(`${BASE_URL}/org/employees/`)
  }

  createUser(employee: IAddEmployee) {
    return this.http.post(`${BASE_URL}/user/createUser`, employee)
  }

  addEmployee(employee: Employee) {
    return this.http.post(`${BASE_URL}/org/add`, { employeeId: employee._id })
  }

  updateEmployee(employee: Employee) {
    return this.http.put(`${BASE_URL}/user/updateUser`, employee)
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete(`${BASE_URL}/user/deleteUser`, { body: { _id: employeeId } })
  }
  
  searchEmployee(query: string) {
    return this.http.post(`${BASE_URL}/user/search`, { query });
  }
}
