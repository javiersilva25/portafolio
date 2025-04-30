import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NutricionService } from 'src/app/services/nutricion.service';

@Component({
  selector: 'app-alimento-modal',
  templateUrl: './alimento-modal.component.html',
  styleUrls: ['./alimento-modal.component.scss'],
  standalone: false
})
export class AlimentoModalComponent implements OnInit {

  @Input() tipo: string = '';

  crearNuevo = false;

  nuevoAlimento = {
    nombre: '',
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0,
    calorias: 0
  };

  alimentos: any[] = [];
  alimentoSeleccionado: any = null;
  gramos: number = 100;

  constructor(
    private modalController: ModalController,
    private nutricionService: NutricionService
  ) {}

  ngOnInit() {
    this.nutricionService.getAlimentos().subscribe((data) => {
      this.alimentos = data;
    });
  }

  calcularMacros(alimento: any, gramos: number) {
    const factor = gramos / 100;
    return {
      id: alimento.id,
      nombre: alimento.nombre,
      gramos,
      calorias: alimento.calorias * factor,
      carbohidratos: alimento.carbohidratos * factor,
      proteinas: alimento.proteinas * factor,
      grasas: alimento.grasas * factor,
    };
  }

  guardar() {
    if (this.gramos <= 0) return;
  
    if (this.crearNuevo) {
      this.nutricionService.postAlimento(this.nuevoAlimento).subscribe((nuevo) => {
        const factor = this.gramos / 100;
        const alimentoProcesado = {
          id: nuevo.id,
          nombre: nuevo.nombre,
          gramos: this.gramos,
          calorias: nuevo.calorias * factor,
          carbohidratos: nuevo.carbohidratos * factor,
          proteinas: nuevo.proteinas * factor,
          grasas: nuevo.grasas * factor
        };
        this.modalController.dismiss(alimentoProcesado);
      });
    } else if (this.alimentoSeleccionado) {
      const a = this.alimentoSeleccionado;
      const factor = this.gramos / 100;
      const alimentoProcesado = {
        id: a.id,
        nombre: a.nombre,
        gramos: this.gramos,
        calorias: a.calorias * factor,
        carbohidratos: a.carbohidratos * factor,
        proteinas: a.proteinas * factor,
        grasas: a.grasas * factor
      };
      this.modalController.dismiss(alimentoProcesado);
    }
  }
  
  calcularCalorias() {
    const p = this.nuevoAlimento.proteinas || 0;
    const g = this.nuevoAlimento.grasas || 0;
    const c = this.nuevoAlimento.carbohidratos || 0;
    this.nuevoAlimento.calorias = (p * 4) + (c * 4) + (g * 9);
  }

  cancelar() {
    this.modalController.dismiss(null);
  }
}
