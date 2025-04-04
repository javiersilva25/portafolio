import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss'],
  standalone: false
})
export class AddFoodComponent {
  nuevoAlimento = {
    nombre: '',
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0
  };

  constructor(private api: ApiService) {}

  ngOnInit() {}

  agregarAlimento() {
    this.api.addFood(this.nuevoAlimento).subscribe(
      (res) => {
        console.log('Alimento agregado:', res);
        alert('Alimento agregado correctamente');
        this.resetFormulario()
      },
      (err) => {
        console.error('Error al agregar alimento:', err);
      }
    );
  }

  resetFormulario() {
    this.nuevoAlimento = {
      nombre: '',
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    };
  }
}
