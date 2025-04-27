import { Component } from '@angular/core';
import { EntrenamientoService } from '../../services/entrenamiento.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.component.html',
  styleUrls: ['./entrenamientos.component.scss'],
  standalone: false
})
export class EntrenamientosComponent {
  rutina = {
    nombre_rutina: '',
    descripcion: '',
    ejercicios: [] as any[]
  };

  ejercicioActual = {
    nombre_ejercicio: '',
    series: 0,
    repeticiones: 0,
    peso: 0
  };

  constructor(private entrenamientoService: EntrenamientoService,
              private toastController: ToastController
  ) {}

  agregarEjercicio() {
    if (!this.ejercicioActual.nombre_ejercicio) {
      return; // No agregar si el ejercicio está vacío
    }
    this.rutina.ejercicios.push({ ...this.ejercicioActual });
    this.ejercicioActual = { nombre_ejercicio: '', series: 0, repeticiones: 0, peso: 0 };
  }

  editarEjercicio(index: number) {
    const ejercicio = this.rutina.ejercicios[index];
    this.ejercicioActual = { ...ejercicio }; // Carga en el formulario
    this.rutina.ejercicios.splice(index, 1); // Elimina temporalmente
  }

  eliminarEjercicio(index: number) {
    this.rutina.ejercicios.splice(index, 1);
  }

  guardarRutina() {
    if (!this.rutina.nombre_rutina || this.rutina.ejercicios.length === 0) {
      return; // No guardar si falta info
    }
  
    this.entrenamientoService.crearEntrenamiento(this.rutina).subscribe({
      next: async () => {
        this.rutina = { nombre_rutina: '', descripcion: '', ejercicios: [] };
        
        const toast = await this.toastController.create({
          message: 'Rutina guardada exitosamente ✅',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Error al guardar rutina ❌',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        console.error('Error al guardar rutina', err);
      }
    });
  }
  

  
}
