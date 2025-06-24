import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EjerciciosService {
  constructor(private http: HttpClient) {}

  obtenerEjercicios() {
  return this.http.get<any[]>('http://localhost:8000/api/ejercicios-simplyfitness');
}
}
