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

  login(credentials: any): Observable<any> {
      console.log("Credentials for login: ", credentials);
      return this.http.post("http://localhost:9999/auth/login", credentials);
  }
}
