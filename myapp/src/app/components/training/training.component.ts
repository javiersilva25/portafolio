import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/guards/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  fecha: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  ejercicios: any[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.agregarEjercicio(); // Mostrar al menos uno
  }

  agregarEjercicio() {
    this.ejercicios.push({
      descripcion: '',
      series: [
        { repeticiones: 0, peso: 0 }
      ]
    });
  }

  eliminarEjercicio(index: number) {
    this.ejercicios.splice(index, 1);
  }

  agregarSerie(ejIndex: number) {
    this.ejercicios[ejIndex].series.push({ repeticiones: 0, peso: 0 });
  }

  eliminarSerie(ejIndex: number, serieIndex: number) {
    this.ejercicios[ejIndex].series.splice(serieIndex, 1);
  }

  guardarEntrenamiento() {
    const id_usuario = this.authService.obtenerIdUsuario();

    const entrenamiento = {
      fecha: this.fecha,
      id_usuario,
      ejercicios: this.ejercicios
    };

    this.apiService.addTraining(entrenamiento).subscribe({
      next: () => {
        alert('Entrenamiento guardado correctamente');
        this.ejercicios = [];
        this.agregarEjercicio();
      },
      error: () => alert('Hubo un error al guardar el entrenamiento')
    });
  }
}
