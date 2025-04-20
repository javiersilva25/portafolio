import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000'; // tu backend

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/users/me`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.apiUrl}/users/me`, data);
  }
}
