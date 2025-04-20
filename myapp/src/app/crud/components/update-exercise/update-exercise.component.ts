import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.scss'],
  standalone: false,
})
export class UpdateExerciseComponent implements OnInit {
  ejercicios: any[] = [];
  ejercicioId: string = '';
  ejercicioNuevo = {
    nombre: '',
    video_url: ''
  };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.cargarEjercicios();
  }

  cargarEjercicios() {
    this.api.getAllExercises().subscribe(
      (data: any) => {
        this.ejercicios = data;
      },
      (error) => {
        console.error('Error al cargar ejercicios', error);
      }
    );
  }

  cargarDatos() {
    if (this.ejercicioId) {
      this.api.getExercise(this.ejercicioId).subscribe(
        (data: any) => {
          this.ejercicioNuevo = {
            nombre: data.nombre,
            video_url: data.video_url
          };
        },
        (error) => {
          console.error('Error al cargar datos del ejercicio', error);
        }
      );
    }
  }

  editarEjercicio() {
    if (this.ejercicioId) {
      this.api.updateExercise(this.ejercicioId, this.ejercicioNuevo).subscribe(
        (response) => {
          console.log('Ejercicio actualizado correctamente', response);
          alert('Ejercicio actualizado correctamente');
          this.router.navigate(['/ejercicios/updateExercise']);
        },
        (error) => {
          console.error('Error al actualizar el ejercicio', error);
        }
      );
    }
  }
}
