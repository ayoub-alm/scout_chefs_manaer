import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="navbar" dir="rtl">
        <div class="nav-content">
          <a routerLink="/" class="brand">
         
            <span class="brand-text">
            <img src="/logo.jpg" height="60" width="60" alt="SAHI Logo" class=" img-fluid">
            </span>
          </a>
          <nav class="nav-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
              <mat-icon>home</mat-icon>
              <span>الرئيسية</span>
            </a>
            <a routerLink="/join" routerLinkActive="active" class="nav-link">
              <mat-icon>group_add</mat-icon>
              <span>انضم إلينا</span>
            </a>

            <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
              <mat-icon>dashboard</mat-icon>
              <span>لوحة التحكم</span>
            </a>
            <a routerLink="/login" class="nav-btn-primary">
              <span>تسجيل الدخول</span>
              <mat-icon>login</mat-icon>
            </a>
          </nav>
        </div>
      </header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .navbar {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
    }
    
    .nav-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .brand {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: transform 0.3s ease;
    }
    
    .brand:hover {
      transform: translateY(-1px);
    }

    .brand-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 10px rgba(102, 36, 131, 0.28);
    }

    .brand-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    
    .brand-text {
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'Noto Kufi Arabic', 'Poppins', sans-serif;
    }
    
    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    
    .nav-link {
      text-decoration: none;
      color: var(--gray-600);
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }

    .nav-link mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      opacity: 0.7;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary-color);
      background: rgba(102, 36, 131, 0.08);
    }

    .nav-link:hover mat-icon, .nav-link.active mat-icon {
      opacity: 1;
      transform: scale(1.1);
    }
    
    .nav-btn-primary {
      text-decoration: none;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(102, 36, 131, 0.32);
    }
    
    .nav-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 36, 131, 0.38);
      background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
    }

    .nav-btn-primary mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    
    .main-content {
      flex: 1;
    }
    
    @media (max-width: 768px) {
      .nav-content {
        padding: 1rem;
      }
      
      .nav-links {
        gap: 1rem;
      }

      .nav-link span {
        display: none;
      }
      
      .brand-text {
        font-size: 1.5rem;
      }

      .nav-btn-primary span {
        display: none;
      }

      .nav-btn-primary {
        padding: 0.75rem;
        border-radius: 50%;
      }
    }
  `],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, FooterComponent],
  standalone: true
})
export class AppComponent { }
