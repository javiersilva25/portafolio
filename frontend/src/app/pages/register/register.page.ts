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
    this.userService.register(this.user).subscribe({
      next: (response) => {
        console.log('Usuario registrado', response);
        this.navCtrl.navigateRoot('/login');
      },
      error: (error) => {
        console.error('Error en registro', error);
      }
    });
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
