import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NutricionService } from 'src/app/services/nutricion.service';

@Component({
  selector: 'app-alimento-modal',
  templateUrl: './alimento-modal.component.html',
  styleUrls: ['./alimento-modal.component.scss'],
  standalone: false
})
export class AlimentoModalComponent implements OnInit {

  @Input() alimentoAEditar: any = null;
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
    private nutricionService: NutricionService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.nutricionService.getAlimentos().subscribe((data) => {
      this.alimentos = data;
  
      if (this.alimentoAEditar) {
        this.crearNuevo = false;
        const alimentoEnLista = data.find(a => a.id === this.alimentoAEditar.id);
        if (alimentoEnLista) {
          this.alimentoSeleccionado = alimentoEnLista;
        } else {
          this.crearNuevo = true;
          this.nuevoAlimento = {
            nombre: this.alimentoAEditar.nombre,
            proteinas: this.alimentoAEditar.proteinas,
            carbohidratos: this.alimentoAEditar.carbohidratos,
            grasas: this.alimentoAEditar.grasas,
            calorias: this.alimentoAEditar.calorias
          };
        }
        this.gramos = this.alimentoAEditar.gramos;
      }
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
    if (this.gramos == null || this.gramos <= 0) {
      this.mostrarToast('Ingresa una cantidad válida en gramos', 'danger');
      return;
    }

    if (this.crearNuevo) {
      const { nombre, proteinas, carbohidratos, grasas, calorias } = this.nuevoAlimento;

      if (!nombre || proteinas == null || carbohidratos == null || grasas == null || calorias == null) {
        this.mostrarToast('Completa todos los campos del nuevo alimento', 'danger');
        return;
      }

      if (proteinas < 0 || carbohidratos < 0 || grasas < 0 || calorias < 0) {
        this.mostrarToast('Los valores no pueden ser negativos', 'danger');
        return;
      }

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

    } else {
      if (!this.alimentoSeleccionado) {
        this.mostrarToast('Selecciona un alimento', 'danger');
        return;
      }

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

  async mostrarToast(mensaje: string, color: string = 'primary') {
    const alert = await this.alertController.create({
      header: color === 'danger' ? 'Error' : 'Aviso',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
