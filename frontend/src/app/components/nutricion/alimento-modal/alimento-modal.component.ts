import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NutricionService } from 'src/app/services/nutricion.service';
import { OpenFoodFactsService } from 'src/app/services/openfoodfacts.service';
interface Alimento {
  id: string;
  nombre: string;
  calorias: number;
  carbohidratos: number;
  proteinas: number;
  grasas: number;
  externo?: boolean;
}


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

  alimentosLocales: Alimento[] = [];
  alimentosExternos: Alimento[] = [];
  alimentosFiltrados: Alimento[] = [];
  terminoBusqueda: string = '';



  constructor(
    private modalController: ModalController,
    private nutricionService: NutricionService,
    private alertController: AlertController,
    private openFoodFactsService: OpenFoodFactsService
  ) {}

  ngOnInit() {
  this.nutricionService.getAlimentos().subscribe((data) => {
    this.alimentosLocales = data;
    this.actualizarFiltrados();

    if (this.alimentoAEditar) {
      this.crearNuevo = false;
      const alimentoEnLista = data.find(a => a.id === this.alimentoAEditar.id);
      if (alimentoEnLista) {
        this.alimentoSeleccionado = alimentoEnLista;
      } else {
        this.crearNuevo = true;
        this.nuevoAlimento = { ...this.alimentoAEditar };
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

const procesarYGuardar = (alimentoFinal: any) => {
  const alimentoProcesado = {
    id: alimentoFinal.id,
    nombre: alimentoFinal.nombre,
    gramos: this.gramos,
    calorias: alimentoFinal.calorias * factor,
    carbohidratos: alimentoFinal.carbohidratos * factor,
    proteinas: alimentoFinal.proteinas * factor,
    grasas: alimentoFinal.grasas * factor
  };
  this.modalController.dismiss(alimentoProcesado);
};

if (a.externo) {
  const alimentoAGuardar = {
    nombre: a.nombre,
    calorias: a.calorias,
    proteinas: a.proteinas,
    carbohidratos: a.carbohidratos,
    grasas: a.grasas
  };

  this.nutricionService.postAlimento(alimentoAGuardar).subscribe((nuevo) => {
    procesarYGuardar({
      ...nuevo,
      gramos: this.gramos
    });
  });

} else {
  procesarYGuardar(a);
}

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

  buscarExternosYAgregar(termino: string) {
  this.terminoBusqueda = termino.trim();

  if (this.terminoBusqueda.length < 3) {
    this.alimentosExternos = [];
    this.actualizarFiltrados();
    return;
  }

  this.openFoodFactsService.buscarAlimentos(this.terminoBusqueda).subscribe(response => {
    this.alimentosExternos = response.products.map((p: any) => ({
      id: 'ext_' + (p.code || Math.random()),
      nombre: p.product_name || 'Producto sin nombre',
      calorias: p.nutriments?.['energy-kcal_100g'] || 0,
      carbohidratos: p.nutriments?.['carbohydrates_100g'] || 0,
      proteinas: p.nutriments?.['proteins_100g'] || 0,
      grasas: p.nutriments?.['fat_100g'] || 0,
      externo: true
    }));

    this.actualizarFiltrados();
  });
}

actualizarFiltrados() {
  const termino = this.terminoBusqueda.toLowerCase();

  const localesFiltrados = this.alimentosLocales.filter(a =>
    a.nombre.toLowerCase().includes(termino)
  );

  const externosFiltrados = this.alimentosExternos.filter(a =>
    a.nombre.toLowerCase().includes(termino)
  );

  // Evitar duplicados por nombre
  const nombresLocales = new Set(localesFiltrados.map(a => a.nombre));
  const externosSinDuplicar = externosFiltrados.filter(a => !nombresLocales.has(a.nombre));

  this.alimentosFiltrados = [...localesFiltrados, ...externosSinDuplicar];
}

seleccionarAlimento(alimento: Alimento) {
  this.alimentoSeleccionado = alimento;
  this.terminoBusqueda = alimento.nombre; // opcional: mostrar lo seleccionado
  this.alimentosFiltrados = []; // oculta el listado
}

limpiarBusqueda() {
  this.terminoBusqueda = '';
  this.alimentosFiltrados = [];
}




}
