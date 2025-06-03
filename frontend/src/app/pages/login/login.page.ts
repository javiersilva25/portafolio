import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async onSubmit() {
    if (!this.credentials.username || !this.credentials.password) {
      await this.showAlert('Campos requeridos', 'Por favor ingresa usuario y contraseña.');
      return;
    }

    this.userService.login(this.credentials).subscribe({
      next: async (response) => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.access_token.trim());
        await this.showAlert('Bienvenido', 'Inicio de sesión exitoso.');
        this.navCtrl.navigateRoot('/home');
      },
      error: async (error) => {
        console.error('Error en login', error);
        await this.showAlert('Error', 'Usuario o contraseña incorrectos.');
      }
    });
  }

  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
