import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../../services/rutina.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
  standalone: false
})
export class RutinasPage implements OnInit {

  rutinas: any[] = [];

  constructor(
    private rutinaService: RutinaService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.listarRutinas();
  }

  listarRutinas() {
    this.rutinaService.listarRutinas().subscribe({
      next: (res) => this.rutinas = res,
      error: (err) => console.error('Error al listar rutinas', err)
    });
  }

  async eliminarRutina(id: number) {
    const alerta = await this.alertCtrl.create({
      header: '¿Eliminar?',
      message: '¿Estás seguro de eliminar esta rutina?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.rutinaService.eliminarRutina(id).subscribe({
              next: () => {this.listarRutinas(),
                this.mostrarToast('Rutina eliminada ✅');
              },
              error: (err) => console.error('Error al eliminar rutina', err)
            });
          }
        }
      ]
    });

    await alerta.present();
  }

  verDetalle(id: number) {
    this.navCtrl.navigateForward(`/rutina-detalle/${id}`);
  }

  async editarRutina(rutina: any) {
    const alerta = await this.alertCtrl.create({
      header: 'Editar Rutina',
      inputs: [
        {
          name: 'nombre_rutina',
          type: 'text',
          placeholder: 'Nombre de la rutina',
          value: rutina.nombre_rutina
        },
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripción',
          value: rutina.descripcion
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const actualizacion = {
              nombre_rutina: data.nombre_rutina,
              descripcion: data.descripcion,
              ejercicios: []
            };
            this.rutinaService.actualizarRutina(rutina.id, actualizacion).subscribe({
              next: () => {
                this.listarRutinas();
                this.mostrarToast('Rutina actualizada ✅');
              },
              error: (err) => console.error('Error al actualizar rutina', err)
            });
          }
        }
      ]
    });
  
    await alerta.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = document.createElement('ion-toast');
    toast.message = mensaje;
    toast.duration = 2000;
    toast.color = 'success';
    document.body.appendChild(toast);
    await toast.present();
  }
  
}
