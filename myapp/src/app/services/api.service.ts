import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Food {
  nombre: string;
  cantidad: number;
  medida: string;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  calorias: number;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  apiURL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // MÉTODOS GET FOODS

  getFood(id: string) {
    return this.http.get(`${this.apiURL}/foods/${id}`);
  }

  getAllFoods() {
    return this.http.get(`${this.apiURL}/foods`);
  }

  // MÉTODOS CRUD FOODS

  addFood(food: any) {
    return this.http.post(`${this.apiURL}/foods`, food);
  }

  updateFood(id: string, food: any) {
    return this.http.put(`${this.apiURL}/foods/${id}`, food);
  }

  deleteFood(id: string) {
    return this.http.delete(`${this.apiURL}/foods/${id}`);
  }
  
  // MÉTODOS GET EXERCISES

  getAllExercises() {
    return this.http.get(`${this.apiURL}/exercises`);
  }
  
  getExercise(id: string) {
    return this.http.get(`${this.apiURL}/exercises/${id}`);
  }
  
  // MÉTODOS CRUD EXERCISES

  addExercise(ejercicio: any) {
    return this.http.post(`${this.apiURL}/exercises`, ejercicio);
  }

  updateExercise(id: string, ejercicio: any) {
    return this.http.put(`${this.apiURL}/exercises/${id}`, ejercicio);
  }
  
  deleteExercise(id: string) {
    return this.http.delete(`${this.apiURL}/exercises/${id}`);
  }
  


}


