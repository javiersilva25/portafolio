import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
})
export class RegisterPage {
  nombre = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.register(this.nombre, this.email, this.password).subscribe({
      next: () => {
        alert('Registro exitoso. Iniciá sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar. ¿Ya existe el usuario?');
      }
    });
  }
}
