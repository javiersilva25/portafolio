import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-food',
  templateUrl: './delete-food.component.html',
  styleUrls: ['./delete-food.component.scss'],
  standalone: false
})
export class DeleteFoodComponent implements OnInit {
  alimentos: any[] = [];
  alimentoSeleccionadoId: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.cargarAlimentos();
  }

  cargarAlimentos() {
    this.api.getAllFoods().subscribe(
      (data: any) => {
        this.alimentos = data;
      },
      (error) => {
        console.error('Error al cargar alimentos', error);
      }
    );
  }

  eliminarAlimento() {
    if (this.alimentoSeleccionadoId) {
      this.api.deleteFood(this.alimentoSeleccionadoId).subscribe(
        (response) => {
          console.log('Alimento eliminado exitosamente', response);
          this.cargarAlimentos(); // refresca la lista
          this.router.navigate(['/macros/deleteFood']); // o quedarte donde estás
        },
        (error) => {
          console.error('Error al eliminar el alimento', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún alimento');
    }
  }
}
