import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface LoginCredentials {
  email: string,
  password: string,
}

export interface SignupCredentials {
  email: string,
  name: string,
  password: string,
  role: string,
}

export interface CreateOrgCredentials {
  email: string,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginCredentials) {
    console.log("Credentials for login: ", credentials);
    return this.http.post("http://localhost:9999/auth/login", credentials);
  }

  signup(credentials: SignupCredentials) {
    console.log("Credentials for signup: ", credentials);
    return this.http.post("http://localhost:9999/auth/signup", credentials);
  }

  createOrg(credentials: CreateOrgCredentials, token: string) {
    console.log("Credentials for create org: ", credentials, token);
    return this.http.post("http://localhost:9999/org/create", credentials, {headers: {Authorization: `Bearer ${token}`}});
  }
}
