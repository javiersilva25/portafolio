import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/routers';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  
login(credentials: any): Observable<any> {
  const body = new HttpParams()
    .set('username', credentials.username)
    .set('password', credentials.password);

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers });
}
}
