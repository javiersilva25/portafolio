import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
  standalone: false
})
export class AddExerciseComponent {
  nuevoEjercicio = {
    nombre: '',
    video_url: ''
  };

  constructor(private api: ApiService) {}

  agregarEjercicio() {
    this.api.addExercise(this.nuevoEjercicio).subscribe(
      (res) => {
        console.log('Ejercicio agregado:', res);
        alert('Ejercicio agregado correctamente');
        this.resetFormulario();
      },
      (err) => {
        console.error('Error al agregar ejercicio:', err);
      }
    );
  }

  resetFormulario() {
    this.nuevoEjercicio = {
      nombre: '',
      video_url: ''
    };
  }
}
