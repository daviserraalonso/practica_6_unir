import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'list', loadComponent: () => import('./components/list/list.component').then(m => m.ListComponent) },
  { path: 'detail/:id', loadComponent: () => import('./components/detail/detail.component').then(m => m.DetailComponent) },
  { path: 'form', loadComponent: () => import('./components/form/form.component').then(m => m.FormComponent) },
  { path: 'user-details/:id', loadComponent: () => import('./components/user-details/user-details.component').then(m => m.UserDetailsComponent) },
  { path: 'edit-user/:id', loadComponent: () => import('./components/edit-user/edit-user.component').then(m => m.EditUserComponent) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
