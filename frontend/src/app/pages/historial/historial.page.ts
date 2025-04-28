import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../services/historial.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: false
})
export class HistorialPage implements OnInit {

  historial: any[] = [];

  constructor(private historialService: HistorialService,
              private navCtrl: NavController
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.navCtrl.navigateRoot('/login');
      return;
    }
  
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.historialService.listarHistorial().subscribe({
      next: (res) => {
        this.historial = res.sort((a: any, b: any) => new Date(b.fecha_realizacion).getTime() - new Date(a.fecha_realizacion).getTime());
      },
      error: (err) => console.error('Error al cargar historial', err)
    });
  }

  volverAlHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
