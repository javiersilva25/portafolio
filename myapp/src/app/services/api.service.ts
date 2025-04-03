import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3000';

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
}
