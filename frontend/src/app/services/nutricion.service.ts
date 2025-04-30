import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutricionService {

  private apiUrl = 'http://localhost:8000/routers';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAlimentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alimentos`, this.getHeaders());
  }

  postComida(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comidas`, data, this.getHeaders());
  }

  getComidasPorFecha(fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comidas/${fecha}`, this.getHeaders());
  }

  postAlimento(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alimentos`, data, this.getHeaders());
  }
}
