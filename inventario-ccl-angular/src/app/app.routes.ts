import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./inventario/pages/inventario-page/inventario-page.component').then(m => m.InventarioPageComponent)
  }
];