import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: false
})
export class RegisterPage {
  nombre = '';
  correo = '';
  contrasena = '';
  apellido = '';
  telefono = '';
  fec_nac = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {

    const data = {
      nombre: this.nombre,
      apellido: this.apellido,
      contrasena: this.contrasena,
      correo: this.correo,
      telefono: this.telefono,
      fec_nac: this.fec_nac,
      role: "user"
    };

    this.authService.register(data).subscribe({
      next: () => {
        alert('Registro exitoso. Inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar. ¿Ya existe el usuario?');
      }
    });
  }
}
