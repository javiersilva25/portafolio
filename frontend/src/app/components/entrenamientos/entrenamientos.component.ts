import { Component } from '@angular/core';
import { EntrenamientoService } from '../../services/entrenamiento.service';
import { NavController, AlertController } from '@ionic/angular';
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

  constructor(
    private entrenamientoService: EntrenamientoService,
    private navCtrl: NavController,
    private historialService: HistorialService,
    private alertController: AlertController
  ) {}

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async agregarEjercicio() {
    const { nombre_ejercicio, series, repeticiones, peso } = this.ejercicioActual;

    if (!nombre_ejercicio || series == null || repeticiones == null || peso == null) {
      await this.mostrarAlerta('Error', 'Completa todos los campos del ejercicio.');
      return;
    }

    if (series < 0 || repeticiones < 0 || peso < 0) {
      await this.mostrarAlerta('Error', 'Los valores no pueden ser negativos.');
      return;
    }

    this.rutina.ejercicios.push({ ...this.ejercicioActual });
    this.ejercicioActual = { nombre_ejercicio: '', series: 0, repeticiones: 0, peso: 0 };
    await this.mostrarAlerta('Éxito', 'Ejercicio agregado correctamente.');
  }

  editarEjercicio(index: number) {
    const ejercicio = this.rutina.ejercicios[index];
    this.ejercicioActual = { ...ejercicio };
    this.rutina.ejercicios.splice(index, 1);
  }

  eliminarEjercicio(index: number) {
    this.rutina.ejercicios.splice(index, 1);
  }

  async guardarRutina() {
    if (!this.rutina.nombre_rutina || this.rutina.ejercicios.length === 0) {
      await this.mostrarAlerta('Error', 'Ingresa un nombre para la rutina y al menos un ejercicio.');
      return;
    }

    this.entrenamientoService.crearEntrenamiento(this.rutina).subscribe({
      next: (response) => {
        console.log('Rutina guardada exitosamente', response);

        this.historialService.registrarEntrenamiento(response.rutina_id).subscribe({
          next: async () => {
            await this.mostrarAlerta('Éxito', 'Entrenamiento registrado en historial.');
            this.navCtrl.navigateForward('/historial');
          },
          error: async (err) => {
            console.error('Error al registrar entrenamiento', err);
            await this.mostrarAlerta('Error', 'No se pudo registrar el entrenamiento en el historial.');
          }
        });

      },
      error: async (err) => {
        console.error('Error al guardar rutina', err);
        await this.mostrarAlerta('Error', 'No se pudo guardar la rutina. Intenta nuevamente.');
      }
    });
  }

  goToHistorial() {
    this.navCtrl.navigateRoot('/historial');
  }
}
