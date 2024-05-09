import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: any) {
    console.log("Credentials for login: ", credentials);
    return this.http.post("http://localhost:9999/auth/login", credentials);
  }

  signup(credentials: any) {
    console.log("Credentials for signup: ", credentials);
    return this.http.post("http://localhost:9999/auth/signup", credentials);
  }

  createOrg(credentials: any, token: any) {
    console.log("Credentials for create org: ", credentials, token);
    return this.http.post("http://localhost:9999/org/create", credentials, {headers: {Authorization: `Bearer ${token}`}});
  }
}
