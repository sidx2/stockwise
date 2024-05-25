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
    console.log("Credentials for login: ", credentials);
    return this.http.post(`${BASE_URL}/auth/login/`, credentials);
  }

  signup(credentials: SignupCredentials) {
    console.log("Credentials for signup: ", credentials);
    return this.http.post(`${BASE_URL}/auth/signup`, credentials);
  }

  createOrg(credentials: CreateOrgCredentials, token: string) {
    console.log("Credentials for create org: ", credentials, token);
    return this.http.post(`${BASE_URL}/org/create`, credentials, {headers: {Authorization: `Bearer ${token}`}});
  }
}
