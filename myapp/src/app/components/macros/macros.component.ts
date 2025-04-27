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
}

export interface DailyFood{
  fecha: Date;
  cantidad: number;
  id_usuario: number;
  id_food: number;
  id_horario: number;
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
  comidaSeleccionada: 1 | 2 | 3 = 1;
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];

  alimentoEditando: Food | null = null;
  alimentoSeleccionado: any | null = null;

  nuevoAlimento: Food = {
    descripcion: '',
    cantidad: 0,
    medida: 'gramos',
    proteinas: 0,
    grasas: 0,
    carbohidratos: 0,
    calorias: 0,
    id_usuario: 0
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarBiblioteca();
  }

  cargarBiblioteca() {
    const id_usuario = this.authService.obtenerIdUsuario() ?? 0;

    this.apiService.getUserFood(String(id_usuario)).subscribe((data:any) => {
      this.biblioteca = data;
    })

    this.apiService.getUserDailyFood(id_usuario, this.fechaSeleccionada).subscribe((data: any) => {
      this.desayuno = data.filter((alimento: DailyFood) => alimento.id_horario === 1); // Desayuno
      this.almuerzo = data.filter((alimento: DailyFood) => alimento.id_horario === 2); // Almuerzo
      this.cena = data.filter((alimento: DailyFood) => alimento.id_horario === 3); // Cena
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

  abrirBiblioteca(tipo: 1 | 2 | 3) {
    this.comidaSeleccionada = tipo;
    this.showBiblioteca = true;
  }

  seleccionarAlimentoVisual(alimento: Food) {
    const copia = {
      ...alimento,
      id: undefined,
      //fecha: this.fechaSeleccionada,
      id_usuario: this.authService.obtenerIdUsuario() ?? 0,
    };

    this.apiService.addFood(copia).subscribe(() => {
      this.agregarAComida(this.comidaSeleccionada, copia);
      this.showBiblioteca = false;
    });
  }

  agregarDailyFood() {
    if(!this.alimentoSeleccionado) return;

    const dailyFood = {
      fecha: this.fechaSeleccionada,
      cantidad: 1, 
      id_usuario: this.authService.obtenerIdUsuario() ?? 0,
      id_food: this.alimentoSeleccionado.id_food,  
      id_horario: this.comidaSeleccionada,  
    };

    console.log(dailyFood); 
  
    this.apiService.addDailyFood(dailyFood).subscribe((data) => {
      console.log('DailyFood agregado:', data);
    });
  }

  agregarAComida(tipo: number, alimento: Food) {
    if (tipo === 1) this.desayuno.push(alimento);
    if (tipo === 2) this.almuerzo.push(alimento);
    if (tipo === 3) this.cena.push(alimento);
  }

  editarAlimento(alimento: Food) {
    this.alimentoEditando = { ...alimento };
  }

  guardarEdicion(tipo: 1 | 2 | 3) {
    let tipoComida: 'desayuno' | 'almuerzo' | 'cena';
  
    switch (tipo) {
      case 1:
        tipoComida = 'desayuno';
        break;
      case 2:
        tipoComida = 'almuerzo';
        break;
      case 3:
        tipoComida = 'cena';
        break;
      default:
        throw new Error('Tipo de comida no válido');
    }
  
    const lista = this[tipoComida];
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
    // this.nuevoAlimento.fecha = this.fechaSeleccionada;

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
        id_usuario: id_usuario
      };
    });
  }
}
