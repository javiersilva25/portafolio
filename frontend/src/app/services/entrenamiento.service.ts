import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

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

  listarEntrenamientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/entrenamientos`, this.getHeaders());
  }

  crearEntrenamiento(rutina: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rutinas`, rutina, this.getHeaders());
  }
  
}

