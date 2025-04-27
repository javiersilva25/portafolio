import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private apiUrl = 'http://localhost:8000/routers';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token')?.trim();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
}

  registrarEntrenamiento(rutinaId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/historial/${rutinaId}`, {}, this.getHeaders());
  }

  listarHistorial(): Observable<any> {
    return this.http.get(`${this.apiUrl}/historial`, this.getHeaders());
  }
}
