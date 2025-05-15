import { Component, OnInit } from '@angular/core';
import { NutricionService } from 'src/app/services/nutricion.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AlimentoModalComponent } from './alimento-modal/alimento-modal.component';

type TipoComida = 'desayuno' | 'almuerzo' | 'cena';

interface AlimentoSeleccionado {
  id: number;
  nombre: string;
  gramos: number;
  calorias: number;
  carbohidratos: number;
  proteinas: number;
  grasas: number;
}

@Component({
  selector: 'app-nutricion',
  templateUrl: './nutricion.component.html',
  styleUrls: ['./nutricion.component.scss'],
  standalone: false
})
export class NutricionComponent implements OnInit {

  fechaHoy: string = new Date().toISOString().split('T')[0];
  tiposComida: TipoComida[] = ['desayuno', 'almuerzo', 'cena'];

  comidas: Record<TipoComida, AlimentoSeleccionado[]> = {
    desayuno: [],
    almuerzo: [],
    cena: []
  };

  totalCalorias = 0;
  totalCarbohidratos = 0;
  totalProteinas = 0;
  totalGrasas = 0;
  

  constructor(
    private nutricionService: NutricionService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarComidasPorFecha();
  }

  async abrirModal(tipo: TipoComida) {
    const modal = await this.modalController.create({
      component: AlimentoModalComponent,
      componentProps: { tipo }
    });

    

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.comidas[tipo].push(data.data);
        this.calcularTotales();
        this.guardarDia();
      }
    });

    await modal.present();
  }

  calcularTotales() {
    this.totalCalorias = 0;
    this.totalCarbohidratos = 0;
    this.totalProteinas = 0;
    this.totalGrasas = 0;

    this.tiposComida.forEach(tipo => {
      for (let alimento of this.comidas[tipo]) {
        this.totalCalorias += alimento.calorias;
        this.totalCarbohidratos += alimento.carbohidratos;
        this.totalProteinas += alimento.proteinas;
        this.totalGrasas += alimento.grasas;
      }
    });
  }

  guardarDia() {
  const fecha = this.fechaHoy;

  this.tiposComida.forEach(tipo => {
    const tieneComidas = this.comidas[tipo].length > 0;

    this.nutricionService.deleteComidaPorFechaYTipo(fecha, tipo).subscribe({
      next: () => {
        if (tieneComidas) {
          this.nutricionService.postComida({
            tipo,
            fecha,
            registros: this.comidas[tipo].map((a) => ({
              gramos: a.gramos,
              alimento_id: a.id
            }))
          }).subscribe({
            next: () => this.mostrarToast(`Comida ${tipo} actualizada`),
            error: (err) => {
              this.mostrarToast(`Error al guardar comida ${tipo}`, 'danger');
              console.error(err);
            }
          });
        } else {
          this.mostrarToast(`Comida ${tipo} eliminada`);
        }
      },
      error: (err) => {
        console.warn(`No se pudo eliminar comida ${tipo}:`, err);

        if (tieneComidas) {
          this.nutricionService.postComida({
            tipo,
            fecha,
            registros: this.comidas[tipo].map((a) => ({
              gramos: a.gramos,
              alimento_id: a.id
            }))
          }).subscribe({
            next: () => this.mostrarToast(`Comida ${tipo} guardada automáticamente`),
            error: (err) => {
              this.mostrarToast(`Error al guardar comida ${tipo}`, 'danger');
              console.error(err);
            }
          });
        }
      }
    });
  });
}


  cargarComidasPorFecha() {
    this.comidas = {
      desayuno: [],
      almuerzo: [],
      cena: []
    };

    this.nutricionService.getComidasPorFecha(this.fechaHoy).subscribe((comidas) => {
      for (let comida of comidas) {
        const tipo = comida.tipo as TipoComida;
        if (this.comidas[tipo]) {
          this.comidas[tipo] = comida.registros.map((registro: any) => {
            const alimento = registro.alimento;
            const factor = registro.gramos / 100;
            return {
              id: alimento.id,
              nombre: alimento.nombre,
              gramos: registro.gramos,
              calorias: alimento.calorias * factor,
              carbohidratos: alimento.carbohidratos * factor,
              proteinas: alimento.proteinas * factor,
              grasas: alimento.grasas * factor
            };
          });
        }
      }
      this.calcularTotales();
    });
  }

  eliminarAlimento(tipo: TipoComida, index: number) {
    console.log('Eliminando alimento:', tipo, index);
    this.comidas[tipo].splice(index, 1);
    this.calcularTotales();
    this.guardarDia();
  }

  puedeGuardar(): boolean {
    return this.tiposComida.some(tipo => this.comidas[tipo].length > 0);
  }

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }

  async editarAlimento(tipo: TipoComida, index: number) {
    const alimentoActual = this.comidas[tipo][index];
  
    const modal = await this.modalController.create({
      component: AlimentoModalComponent,
      componentProps: {
        tipo,
        alimentoAEditar: alimentoActual
      }
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.comidas[tipo][index] = data.data;
        this.calcularTotales();
        this.guardarDia();
      }
    });
  
    await modal.present();
  }
  
}
