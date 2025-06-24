import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OpenFoodFactsService {
  constructor(private http: HttpClient) {}

  buscarAlimentos(nombre: string) {
    const url = 'https://world.openfoodfacts.org/cgi/search.pl';
    const params = {
      search_terms: nombre,
      search_simple: '1',
      action: 'process',
      json: '1',
      page_size: '20',
    };

    return this.http.get<any>(url, { params });
  }
}
