import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/guards/auth.service';

export interface Food {
  id?: number;
  descripcion: string;
  cantidad: number;
  medida: string;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  calorias: number;
  id_usuario: number;
  fecha?: string;
}

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss'],
  standalone: false
})
export class MacrosComponent implements OnInit {
  biblioteca: Food[] = [];
  desayuno: Food[] = [];
  almuerzo: Food[] = [];
  cena: Food[] = [];

  objetivoCalorias = 2000;
  showBiblioteca = false;
  comidaSeleccionada: 'desayuno' | 'almuerzo' | 'cena' = 'desayuno';
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];

  alimentoEditando: Food | null = null;
  alimentoSeleccionado: Food | null = null;

  nuevoAlimento: Food = {
    descripcion: '',
    cantidad: 0,
    medida: 'gramos',
    proteinas: 0,
    grasas: 0,
    carbohidratos: 0,
    calorias: 0,
    id_usuario: 0,
    fecha: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarBiblioteca();
  }

  cargarBiblioteca() {
    this.apiService.getAllFoods().subscribe((data: any) => {
      this.biblioteca = data;
    });
  }

  getCaloriasTotales(comida: Food[]) {
    return comida.reduce((sum, f) => sum + f.calorias, 0);
  }

  getMacros(comida: Food[]) {
    return {
      proteinas: comida.reduce((sum, f) => sum + f.proteinas, 0),
      grasas: comida.reduce((sum, f) => sum + f.grasas, 0),
      carbohidratos: comida.reduce((sum, f) => sum + f.carbohidratos, 0),
    };
  }

  abrirBiblioteca(tipo: 'desayuno' | 'almuerzo' | 'cena') {
    this.comidaSeleccionada = tipo;
    this.showBiblioteca = true;
  }

  seleccionarAlimentoVisual(alimento: Food) {
    const copia = {
      ...alimento,
      id: undefined,
      fecha: this.fechaSeleccionada,
      id_usuario: this.authService.obtenerIdUsuario() ?? 0,
    };

    this.apiService.addFood(copia).subscribe(() => {
      this.agregarAComida(this.comidaSeleccionada, copia);
      this.showBiblioteca = false;
    });
  }

  agregarDesdeSelect() {
    if (!this.alimentoSeleccionado) return;

    const copia = {
      ...this.alimentoSeleccionado,
      id: undefined,
      fecha: this.fechaSeleccionada,
      id_usuario: this.authService.obtenerIdUsuario() ?? 0,
    };

    this.apiService.addFood(copia).subscribe(() => {
      this.agregarAComida(this.comidaSeleccionada, copia);
      this.alimentoSeleccionado = null;
    });
  }

  agregarAComida(tipo: string, alimento: Food) {
    if (tipo === 'desayuno') this.desayuno.push(alimento);
    if (tipo === 'almuerzo') this.almuerzo.push(alimento);
    if (tipo === 'cena') this.cena.push(alimento);
  }

  editarAlimento(alimento: Food) {
    this.alimentoEditando = { ...alimento };
  }

  guardarEdicion(tipo: 'desayuno' | 'almuerzo' | 'cena') {
    const lista = this[tipo];
    const index = lista.findIndex(a => a.descripcion === this.alimentoEditando!.descripcion);
    if (index !== -1) lista[index] = { ...this.alimentoEditando! };
    this.alimentoEditando = null;
  }

  eliminarAlimento(tipo: 'desayuno' | 'almuerzo' | 'cena', alimento: Food) {
    this[tipo] = this[tipo].filter(a => a !== alimento);
  }

  calcularCalorias() {
    const p = this.nuevoAlimento.proteinas || 0;
    const g = this.nuevoAlimento.grasas || 0;
    const c = this.nuevoAlimento.carbohidratos || 0;
    this.nuevoAlimento.calorias = (p * 4) + (c * 4) + (g * 9);
  }

  agregarNuevoAlimento() {
    const id_usuario = this.authService.obtenerIdUsuario() ?? 0;
    this.nuevoAlimento.id_usuario = id_usuario;
    this.nuevoAlimento.fecha = this.fechaSeleccionada;

    this.apiService.addFood(this.nuevoAlimento).subscribe(() => {
      this.cargarBiblioteca();
      this.nuevoAlimento = {
        descripcion: '',
        cantidad: 0,
        medida: 'gramos',
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0,
        calorias: 0,
        id_usuario: id_usuario,
        fecha: this.fechaSeleccionada
      };
    });
  }
}
