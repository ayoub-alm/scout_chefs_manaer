import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { JoinComponent } from './features/join/join.component';
import { LoginComponent } from './features/auth/login.component';

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
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./features/dashboard/overview/dashboard-overview.component').then(m => m.DashboardOverviewComponent)
      },
      {
        path: 'members',
        loadComponent: () => import('./features/dashboard/members/member-list.component').then(m => m.MemberListComponent)
      },
      {
        path: 'members/:id',
        loadComponent: () => import('./features/dashboard/member-details/member-details.component').then(m => m.MemberDetailsComponent)
      },
      {
        path: 'events',
        loadComponent: () => import('./features/dashboard/events/events-list.component').then(m => m.EventsListComponent)
      },
      {
        path: 'trainings',
        loadComponent: () => import('./features/dashboard/trainings/trainings-list.component').then(m => m.TrainingsListComponent)
      },
      {
        path: 'tasks',
        redirectTo: 'overview' // Placeholder
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
