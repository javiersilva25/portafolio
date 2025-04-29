import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000/routers';

@Injectable({
  providedIn: 'root'
})
export class NutricionService {

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token')?.trim();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAlimentos(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/alimentos`, this.getHeaders());
  }

  postComida(data: any): Observable<any> {
    return this.http.post(`${API_URL}/comidas`, data, this.getHeaders());
  }

  getComidasPorFecha(fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/comidas/fecha/${fecha}`, this.getHeaders());
  }

  postAlimento(data: any): Observable<any> {
    return this.http.post(`${API_URL}/alimentos`, data, this.getHeaders());
  }
}
