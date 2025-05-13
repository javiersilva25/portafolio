import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';

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

  constructor(private userService: UserService, private navCtrl: NavController) {}

  onSubmit() {
    if (!this.credentials.username || !this.credentials.password) {
      alert('Por favor completa todos los campos.');
      return;
    }
    /*
    if (this.credentials.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    */
    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.access_token.trim());
        this.navCtrl.navigateRoot('/home');
      },
      error: (error) => {
        console.error('Error en login', error);
        alert('Usuario o contraseña incorrectos.');
      }
  });
}


  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }
}
