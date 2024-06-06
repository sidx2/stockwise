import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrgCredentials, LoginCredentials, SignupCredentials } from '../models/auth';
import { BASE_URL } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginCredentials) {
    return this.http.post(`${BASE_URL}/auth/login/`, credentials);
  }

  signup(credentials: SignupCredentials) {
    return this.http.post(`${BASE_URL}/auth/signup`, credentials);
  }

  getOrgByUserId() {
    return this.http.get(`${BASE_URL}/org/getOrg/`)
  }

  createOrg(credentials: CreateOrgCredentials, token: string) {
    return this.http.post(`${BASE_URL}/org/create`, credentials, { headers: { Authorization: `Bearer ${token}` } });
  }

  changePassword(currPassword: string, newPassword: string) {
    return this.http.post(`${BASE_URL}/auth/changePassword`, { currPassword, newPassword });
  }
}
