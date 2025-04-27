import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  private apiUrl = 'http://localhost:8000/routers';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  listarRutinas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutinas`, this.getHeaders());
  }

  detalleRutina(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutinas/${id}`, this.getHeaders());
  }

  actualizarRutina(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/rutinas/${id}`, data, this.getHeaders());
  }

  eliminarRutina(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rutinas/${id}`, this.getHeaders());
  }
}
