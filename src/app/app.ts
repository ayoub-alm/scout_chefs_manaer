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
            <a routerLink="/blog" routerLinkActive="active" class="nav-link">
              <mat-icon>article</mat-icon>
              <span>الأخبار</span>
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
              <a routerLink="/blog" routerLinkActive="active" class="nav-link" (click)="closeMenu()">
                <mat-icon>article</mat-icon>
                <span>الأخبار</span>
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
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(124, 58, 237, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.08);
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
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1001;
    }
    
    .brand:hover {
      transform: translateY(-2px) scale(1.02);
    }

    .brand-text img {
      max-height: 60px;
      width: auto;
      filter: drop-shadow(0 2px 8px rgba(124, 58, 237, 0.2));
      transition: filter 0.3s ease;
    }

    .brand:hover .brand-text img {
      filter: drop-shadow(0 4px 12px rgba(124, 58, 237, 0.3));
    }

    /* Desktop Navigation */
    .nav-links {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    /* Mobile Menu Button */
    .mobile-menu-btn {
      display: none;
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      border: none;
      color: white;
      padding: 0.625rem;
      cursor: pointer;
      z-index: 1001;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .mobile-menu-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
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
      width: 300px;
      height: 100vh;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      z-index: 1000;
      padding-top: 90px;
      padding-bottom: 2rem;
      transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: -8px 0 32px rgba(124, 58, 237, 0.15);
      overflow-y: auto;
      border-left: 1px solid rgba(124, 58, 237, 0.1);
    }

    .mobile-nav.open {
      right: 0;
    }

    .mobile-nav-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(124, 58, 237, 0.2);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
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
      gap: 0.5rem;
      padding: 0 1.5rem;
    }
    
    .nav-link {
      text-decoration: none;
      color: #4b5563;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.875rem 1.25rem;
      border-radius: 14px;
      position: relative;
      overflow: hidden;
    }

    .nav-link::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(167, 139, 250, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .nav-link mat-icon {
      font-size: 22px;
      width: 22px;
      height: 22px;
      opacity: 0.8;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link:hover, .nav-link.active {
      color: #7c3aed;
      background: rgba(124, 58, 237, 0.08);
      transform: translateX(-3px);
    }

    .nav-link:hover::before, .nav-link.active::before {
      opacity: 1;
    }

    .nav-link:hover mat-icon, .nav-link.active mat-icon {
      opacity: 1;
      transform: scale(1.15) rotate(-5deg);
    }
    
    .nav-btn-primary {
      text-decoration: none;
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      color: white;
      padding: 0.875rem 1.75rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
      position: relative;
      overflow: hidden;
    }

    .nav-btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .nav-btn-primary:hover::before {
      opacity: 1;
    }
    
    .nav-btn-primary:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 30px rgba(124, 58, 237, 0.45);
    }

    .nav-btn-primary mat-icon {
      font-size: 22px;
      width: 22px;
      height: 22px;
      position: relative;
      z-index: 1;
    }

    .nav-btn-primary span {
      position: relative;
      z-index: 1;
    }
    
    .main-content {
      flex: 1;
    }
    
    /* Responsive Design */
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
        padding: 0.625rem 1rem;
      }

      .brand-text img {
        height: 50px;
        width: 50px;
      }
    }

    @media (max-width: 480px) {
      .nav-content {
        padding: 0.5rem 0.75rem;
      }

      .brand-text img {
        height: 45px;
        width: 45px;
      }

      .mobile-nav {
        width: 280px;
      }

      .nav-link {
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
      }

      .nav-btn-primary {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
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
