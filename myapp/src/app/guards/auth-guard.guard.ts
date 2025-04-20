import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/guards/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const token = this.authService.obtenerToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = this.authService.obtenerRol();

    if (expectedRole && role !== expectedRole) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}

