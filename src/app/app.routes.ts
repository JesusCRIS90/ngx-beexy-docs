import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page'),
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/error-page/error-page'),
  },
  {
    path: 'testing',
    loadComponent: () => import('./pages/testing-page/testing-page'),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
