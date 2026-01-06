import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, PasswordModule, ButtonModule, MatIconModule, RouterLink],
  standalone: true
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);

  loginForm!: FormGroup;
  isLoading = signal(false);
  error = signal('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.error.set('');

      const { email, password } = this.loginForm.value;

      this.apiService.login(email, password).subscribe({
        next: (response) => {
          // Store JWT token
          const token = this.apiService.extractToken(response);
          if (token) {
            this.apiService.setToken(token);
          }
          if (response.user) {
            localStorage.setItem('userRole', response.user.role);
            localStorage.setItem('userEmail', response.user.email);
            if (response.user.city) localStorage.setItem('userCity', response.user.city);
            if (response.user.region) localStorage.setItem('userRegion', response.user.region);
          }
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.error.set('البريد الإلكتروني أو كلمة المرور غير صحيحة');
          this.isLoading.set(false);
        }
      });
    }
  }
}