import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'inventario',
    canActivate:[authGuard],
    loadComponent: () =>
      import('./inventario/pages/inventario-page/inventario-page.component').then(m => m.InventarioPageComponent)
  },
  {
    path:'**', redirectTo:'login'
  }
];