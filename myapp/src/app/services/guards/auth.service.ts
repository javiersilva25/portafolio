import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const data = new URLSearchParams();
    data.append('username', email);
    data.append('password', password);
    return this.http.post(`${this.apiURL}/login`, data.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  register(data: any) {
    console.log(data);
    return this.http.post(`${this.apiURL}/register`, data);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  obtenerRol(): string | null {
    const token = this.obtenerToken();
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  }

  getCorreoUsuario(): string | null {
    return localStorage.getItem('userEmail');
  }
}
