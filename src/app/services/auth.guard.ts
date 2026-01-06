import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);

  canActivate(): boolean {
    if (this.apiService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthGuard).canActivate();
};
