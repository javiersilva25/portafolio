import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private navCtrl: NavController) {}

  onSubmit() {
  if (!this.user.username || !this.user.email || !this.user.password) {
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.user.email)) {
    return;
  }

  if (this.user.password.length < 8) {
    return;
  }

  this.userService.register(this.user).subscribe({
    next: (response) => {
      console.log('Usuario registrado', response);
      this.navCtrl.navigateRoot('/login');
    },
    error: (error) => {
      console.error('Error en registro', error);
      alert('Hubo un error al registrar. Intenta con otro usuario o correo.');
    }
  });
}


  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
