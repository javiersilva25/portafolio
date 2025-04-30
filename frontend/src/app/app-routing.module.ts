import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rutinas',
    loadChildren: () => import('./pages/rutinas/rutinas.module').then( m => m.RutinasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rutina-detalle',
    loadChildren: () => import('./pages/rutina-detalle/rutina-detalle.module').then( m => m.RutinaDetallePageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'rutina-detalle/:id', 
    loadChildren: () => import('./pages/rutina-detalle/rutina-detalle.module').then( m => m.RutinaDetallePageModule),
    canActivate: [AuthGuard] 
  },
  { path: 'historial', 
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule),
    canActivate: [AuthGuard] 
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
