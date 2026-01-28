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
          <div class="nav-header">
            <button class="mobile-menu-btn" (click)="toggleMenu()">
              <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
            
            <a routerLink="/" class="brand" (click)="closeMenu()">
               <span class="brand-text">
                <img src="/logo.jpg" height="60" width="60" alt="SAHI Logo" class="img-fluid">
               </span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="nav-links desktop-nav">
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

          <!-- Mobile Navigation Overlay -->
          <div class="mobile-nav-overlay" [class.open]="isMenuOpen" (click)="closeMenu()"></div>
          
          <!-- Mobile Navigation Drawer -->
          <nav class="mobile-nav" [class.open]="isMenuOpen">
            <div class="mobile-nav-content">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link" (click)="closeMenu()">
                <mat-icon>home</mat-icon>
                <span>الرئيسية</span>
              </a>
              <a routerLink="/join" routerLinkActive="active" class="nav-link" (click)="closeMenu()">
                <mat-icon>group_add</mat-icon>
                <span>انضم إلينا</span>
              </a>
              <a routerLink="/dashboard" routerLinkActive="active" class="nav-link" (click)="closeMenu()">
                <mat-icon>dashboard</mat-icon>
                <span>لوحة التحكم</span>
              </a>
              <a routerLink="/login" class="nav-btn-primary" (click)="closeMenu()">
                <span>تسجيل الدخول</span>
                <mat-icon>login</mat-icon>
              </a>
            </div>
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
      overflow-x: hidden;
    }
    
    .navbar {
      background: rgba(255, 255, 255, 0.95);
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
      padding: 0.75rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .brand {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: transform 0.3s ease;
      z-index: 1001;
    }
    
    .brand:hover {
      transform: translateY(-1px);
    }

    .brand-text img {
      max-height: 60px;
      width: auto;
    }

    /* Desktop Navigation */
    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    /* Mobile Menu Button */
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--gray-700, #333);
      padding: 0.5rem;
      cursor: pointer;
      z-index: 1001;
    }

    .mobile-menu-btn mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    /* Mobile Nav Drawer */
    .mobile-nav {
      display: none;
      position: fixed;
      top: 0;
      right: -100%;
      width: 280px;
      height: 100vh;
      background: white;
      z-index: 1000;
      padding-top: 80px;
      padding-bottom: 2rem;
      transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: -4px 0 15px rgba(0,0,0,0.1);
      overflow-y: auto;
    }

    .mobile-nav.open {
      right: 0;
    }

    .mobile-nav-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .mobile-nav-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .mobile-nav-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0 1.5rem;
    }
    
    .nav-link {
      text-decoration: none;
      color: var(--gray-600, #475569);
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 12px;
    }

    .nav-link mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      opacity: 0.7;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary-color, #662483);
      background: rgba(102, 36, 131, 0.08);
    }

    .nav-link:hover mat-icon, .nav-link.active mat-icon {
      opacity: 1;
      transform: scale(1.1);
    }
    
    .nav-btn-primary {
      text-decoration: none;
      background: linear-gradient(135deg, var(--primary-color, #662483) 0%, var(--primary-dark, #4a1a5f) 100%);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(102, 36, 131, 0.32);
    }
    
    .nav-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 36, 131, 0.38);
      background: linear-gradient(135deg, var(--primary-light, #8e4ba8) 0%, var(--primary-color, #662483) 100%);
    }

    .nav-btn-primary mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    
    .main-content {
      flex: 1;
    }
    
    @media (max-width: 900px) {
      .desktop-nav {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }

      .mobile-nav, .mobile-nav-overlay {
        display: block;
      }

      .nav-content {
        padding: 0.5rem 1rem;
      }

      .brand-text img {
        height: 48px;
        width: 48px;
      }
    }
  `],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, FooterComponent],
  standalone: true
})
export class AppComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
