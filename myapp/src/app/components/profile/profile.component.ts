import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/guards/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:false
})
export class ProfileComponent implements OnInit {

  user = {
    nombre: '',
    correo: '',
    rutinasRealizadas: 0
  };

  medidas = {
    grasa: 18,
    peso: 70,
    altura: 170
  };

  metas = {
    grasa: 15,
    peso: 68,
    altura: 172
  };

  editing: boolean = false;
  updatedUser: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.userService.getUserProfile().subscribe((data: any) => {
      this.user = {
        nombre: data.name || 'Usuario',
        correo: data.email || 'correo@example.com',
        rutinasRealizadas: data.routinesDone || 0
      };
      this.updatedUser = { ...this.user };
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (!this.editing) {
      this.updatedUser = { ...this.user };
    }
  }

  guardarCambios() {
    this.userService.updateProfile(this.updatedUser).subscribe(() => {
      this.user = { ...this.updatedUser };
      this.editing = false;
    });
  }

  agregarMedida() {
    console.log('Agregar nueva medida');
  }

  agregarMeta() {
    console.log('Agregar nueva meta');
  }
}
