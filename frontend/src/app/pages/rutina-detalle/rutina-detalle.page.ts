import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutinaService } from '../../services/rutina.service';
import { HistorialService } from '../../services/historial.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rutina-detalle',
  templateUrl: './rutina-detalle.page.html',
  styleUrls: ['./rutina-detalle.page.scss'],
  standalone: false
})
export class RutinaDetallePage implements OnInit {

  rutina: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rutinaService: RutinaService,
    private historialService: HistorialService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.rutinaService.detalleRutina(Number(id)).subscribe({
        next: (res) => this.rutina = res,
        error: (err) => console.error('Error al cargar detalle', err)
      });
    }
  }

  registrarEntrenamiento() {
    if (!this.rutina || !this.rutina.id) {
      return;
    }
  
    this.historialService.registrarEntrenamiento(this.rutina.id).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Entrenamiento registrado exitosamente ✅',
          duration: 1500,
          color: 'success'
        });
        await toast.present();
  
        // ⚡ Luego de mostrar el toast, navegar al historial
        this.navCtrl.navigateForward('/historial');
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Error al registrar entrenamiento ❌',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        console.error('Error al registrar historial', err);
      }
    });
  }

}

