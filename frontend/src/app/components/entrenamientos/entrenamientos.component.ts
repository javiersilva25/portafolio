import { Component } from '@angular/core';
import { EntrenamientoService } from '../../services/entrenamiento.service';
import { ToastController, NavController } from '@ionic/angular';
import { HistorialService } from '../../services/historial.service';

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
              private navCtrl: NavController,
              private historialService: HistorialService,
              private toastController: ToastController) {}
              

  agregarEjercicio() {
    if (!this.ejercicioActual.nombre_ejercicio) {
      return;
    }
    this.rutina.ejercicios.push({ ...this.ejercicioActual });
    this.ejercicioActual = { nombre_ejercicio: '', series: 0, repeticiones: 0, peso: 0 };
  }

  editarEjercicio(index: number) {
    const ejercicio = this.rutina.ejercicios[index];
    this.ejercicioActual = { ...ejercicio };
    this.rutina.ejercicios.splice(index, 1);
  }

  eliminarEjercicio(index: number) {
    this.rutina.ejercicios.splice(index, 1);
  }

  guardarRutina() {
    if (!this.rutina.nombre_rutina || this.rutina.ejercicios.length === 0) {
      return;
    }
  
    this.entrenamientoService.crearEntrenamiento(this.rutina).subscribe({
      next: (response) => {
        console.log('Rutina guardada exitosamente', response);
        
        this.historialService.registrarEntrenamiento(response.rutina_id).subscribe({
          next: async () => {
            const toast = await this.toastController.create({
              message: 'Entrenamiento registrado en historial ✅',
              duration: 2000,
              color: 'success'
            });
            toast.present();
            
            this.navCtrl.navigateForward('/historial');
          },
          error: async (err) => {
            const toast = await this.toastController.create({
              message: 'Error al registrar entrenamiento ❌',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
            console.error('Error al registrar entrenamiento', err);
          }
        });
  
      },
      error: (err) => {
        console.error('Error al guardar rutina', err);
      }
    });
  }
  
  goToHistorial() {
    this.navCtrl.navigateRoot('/historial');
  }

  
}
