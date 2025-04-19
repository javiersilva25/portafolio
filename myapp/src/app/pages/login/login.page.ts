import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.guardarToken(res.access_token);
        this.router.navigate(['/home']); // o cualquier ruta privada
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
