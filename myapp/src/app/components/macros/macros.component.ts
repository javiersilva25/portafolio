import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Food } from 'src/app/services/api.service';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss'],
  standalone:false
})
export class MacrosComponent implements OnInit {
  alimentos: Food[] = [];
  caloriasTotales = 0;
  objetivoCalorias = 2000;

  showModal = false;
  nuevoAlimento: Food = {
    descripcion: '',
    cantidad: 0,
    medida: 'gramos',
    proteinas: 0,
    grasas: 0,
    carbohidratos: 0,
    calorias: 0,
    id_usuario: 2 // DEBE SER ID DE USUARIO ACTUAL
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.obtenerAlimentos();
  }

  obtenerAlimentos() {
    this.apiService.getAllFoods().subscribe((data: any) => {
      this.alimentos = data;
      this.calcularTotales();
    });
  }

  calcularTotales() {
    this.caloriasTotales = this.alimentos.reduce((sum, item) => sum + item.calorias, 0);
  }

  abrirModal() {
    this.nuevoAlimento = {
      descripcion: '',
      cantidad: 0,
      medida: 'gramos',
      proteinas: 0,
      grasas: 0,
      carbohidratos: 0,
      calorias: 0,
      id_usuario: 2 // DEBE SER ID DE USUARIO ACTUAL
    };
    this.showModal = true;
  }

  calcularCalorias() {
    const p = this.nuevoAlimento.proteinas || 0;
    const g = this.nuevoAlimento.grasas || 0;
    const c = this.nuevoAlimento.carbohidratos || 0;
    this.nuevoAlimento.calorias = (p * 4) + (c * 4) + (g * 9);
  }

  agregarAlimento() {
    console.log(this.nuevoAlimento);
    this.apiService.addFood(this.nuevoAlimento).subscribe(() => {
      this.obtenerAlimentos();
      this.showModal = false;
    });
  }

  cancelar() {
    this.showModal = false;
  }
}
