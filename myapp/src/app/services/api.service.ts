import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Food {
  descripcion: string;
  cantidad: number;
  medida: string;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  calorias: number;
  id_usuario: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // ---------- FOODS ----------
  getFood(id: string) {
    return this.http.get(`${this.apiURL}/foods/${id}`);
  }

  getAllFoods() {
    return this.http.get(`${this.apiURL}/foods`);
  }

  getUserFood(id: string) {
    return this.http.get(`${this.apiURL}/users/${id}/foods`);
  }

  addFood(food: any) {
    return this.http.post(`${this.apiURL}/foods`, food);
  }

  getUserDailyFood(id_usuario: number, fecha: string) {
    return this.http.get(`${this.apiURL}/daily_food/${id_usuario}/${fecha}`);
  }

  addDailyFood(dailyFood: any) {
    return this.http.post(`${this.apiURL}/daily_food`, dailyFood);
  }

  updateFood(id: string, food: any) {
    return this.http.put(`${this.apiURL}/foods/${id}`, food);
  }

  deleteFood(id: string) {
    return this.http.delete(`${this.apiURL}/foods/${id}`);
  }

  // ---------- EXERCISES ----------
  getAllExercises() {
    return this.http.get(`${this.apiURL}/exercises`);
  }

  getExercise(id: string) {
    return this.http.get(`${this.apiURL}/exercises/${id}`);
  }

  addExercise(ejercicio: any) {
    return this.http.post(`${this.apiURL}/exercises`, ejercicio);
  }

  updateExercise(id: string, ejercicio: any) {
    return this.http.put(`${this.apiURL}/exercises/${id}`, ejercicio);
  }

  deleteExercise(id: string) {
    return this.http.delete(`${this.apiURL}/exercises/${id}`);
  }

  // ---------- TRAININGS ----------
  addTraining(training: any) {
    return this.http.post(`${this.apiURL}/trainings`, training);
  }
}