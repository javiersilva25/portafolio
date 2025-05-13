import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

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

  getPerfil(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil`, this.getHeaders());
  }
  

  getPerfilPorId(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/perfil/${id}`, this.getHeaders());
  }

  updatePerfil(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil/${id}`, data, this.getHeaders());
  }

  createPerfil(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/perfil`, data, this.getHeaders());
  }



  getObjetivosUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/objetivos/usuario`, this.getHeaders());
  }

  getObjetivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/objetivos`, this.getHeaders());
  }

  createObjetivo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/objetivos`, data, this.getHeaders());
  }

  updateObjetivo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/objetivos/${id}`, data, this.getHeaders());
  }

  deleteObjetivo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/objetivos/${id}`, this.getHeaders());
  }


  
  getMedidas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medidas`, this.getHeaders());
  }

  /*
  postMedida(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medidas`, data, this.getHeaders());
  }
  */

  postMedidaPorNombre(nombre_medida: string, medida: any) {
    return this.http.post(`${this.apiUrl}/medidas/nombre/${nombre_medida}`, medida, this.getHeaders());
  }
  
  updateMedida(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/medidas/${id}`, data, this.getHeaders());
  }

  deleteMedida(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/medidas/${id}`, this.getHeaders());
  }

}
