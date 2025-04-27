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
    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.access_token.trim());
        this.navCtrl.navigateForward('/home');
      },
      error: (error) => {
        console.error('Error en login', error);
      }
    });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
