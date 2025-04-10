import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.scss'],
  standalone: false
})
export class DeleteExerciseComponent implements OnInit {
  ejercicios: any[] = [];
  ejercicioSeleccionadoId: string = '';

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

  eliminarEjercicio() {
    if (this.ejercicioSeleccionadoId) {
      this.api.deleteExercise(this.ejercicioSeleccionadoId).subscribe(
        (response) => {
          console.log('Ejercicio eliminado exitosamente', response);
          this.resetFormulario();
          this.cargarEjercicios();
          this.router.navigate(['/ejercicios/deleteExercise']);
        },
        (error) => {
          console.error('Error al eliminar el ejercicio', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún ejercicio');
    }
  }

  resetFormulario() {
    this.ejercicioSeleccionadoId = '';
  }
}
