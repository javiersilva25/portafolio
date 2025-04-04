import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.scss'],
  standalone:false
})
export class UpdateFoodComponent implements OnInit {

  alimentos: any[] = [];
  alimentoId: string = '';
  alimentoNuevo: any = {
    nombre: '',
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0
  };
  alimentoCargado: any = {
    nombre: '',
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0
  };

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarAlimentos();
  }

  cargarAlimentos() {
    this.api.getAllFoods().subscribe(
      (data: any) => {
        this.alimentos = data;
      },
      (error) => {
        console.error('Error al cargar alimentos', error);
      }
    );
  }

  cargarDatos() {
    console.log('alimentoId:', this.alimentoId);
    this.alimentoCargado = this.alimentos.find(a => a.id === this.alimentoId);
    console.log('alimentoCargado:', this.alimentoCargado);
  
    if (this.alimentoCargado) {
      this.alimentoNuevo.nombre = this.alimentoCargado.nombre;
      this.alimentoNuevo.calorias = this.alimentoCargado.calorias;
      this.alimentoNuevo.proteinas = this.alimentoCargado.proteinas;
      this.alimentoNuevo.carbohidratos = this.alimentoCargado.carbohidratos;
      this.alimentoNuevo.grasas = this.alimentoCargado.grasas;
    } else {
      console.error('Alimento no encontrado');
    }
  }
  

  editarAlimento() {
    this.api.updateFood(this.alimentoId, this.alimentoNuevo).subscribe(
      (response) => {
        console.log('Alimento editado:', response);
        this.resetFormulario();
        this.cargarAlimentos(); 
      },
      (error) => {
        console.error('Error al editar alimento:', error);
      }
    );
  }

  resetFormulario() {
    this.alimentoId = '';
    this.alimentoCargado = {
      nombre: '',
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    };
    this.alimentoNuevo = {
      nombre: '',
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    };
  }
}
