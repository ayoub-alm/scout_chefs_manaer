import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { JoinComponent } from './features/join/join.component';
import { LoginComponent } from './features/auth/login.component';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
