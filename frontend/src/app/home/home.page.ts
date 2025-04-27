import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  segment = 'entrenamientos';

  constructor(private navCtrl: NavController) {}

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/login');
  }
}
