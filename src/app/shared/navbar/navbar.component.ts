import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  template: `
    <header class="navbar" [class.scrolled]="isScrolled" dir="rtl">
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
            <a routerLink="/login" class="nav-btn-primary" (click)="closeMenu()">
              <span>تسجيل الدخول</span>
              <mat-icon>login</mat-icon>
            </a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    /* Google Minimalist Navbar */
    .navbar {
      background: white;
      border-bottom: 1px solid #e8eaed;
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
      box-shadow: 0 1px 3px rgba(60, 64, 67, 0.1);
    }

    .navbar.scrolled {
      box-shadow: 0 2px 8px rgba(0, 51, 153, 0.12), 0 1px 3px rgba(60, 64, 67, 0.15);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
    }
    
    .nav-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .brand {
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: opacity 0.2s ease;
      z-index: 1001;
    }
    
    .brand:hover {
      opacity: 0.8;
    }

    .brand-text img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    /* Desktop Navigation */
    .nav-links {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    /* Mobile Menu Button */
    .mobile-menu-btn {
      display: none;
      background: transparent;
      border: none;
      color: #5f6368;
      padding: 8px;
      cursor: pointer;
      z-index: 1001;
      border-radius: 50%;
      transition: background 0.2s ease;
    }

    .mobile-menu-btn:hover {
      background: #f1f3f4;
    }

    .mobile-menu-btn mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
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
      padding-bottom: 24px;
      transition: right 0.3s ease;
      box-shadow: -2px 0 8px rgba(60, 64, 67, 0.15);
      overflow-y: auto;
      border-left: 1px solid #e8eaed;
    }

    .mobile-nav.open {
      right: 0;
    }

    .mobile-nav-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
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
      gap: 4px;
      padding: 0 16px;
    }
    
    .nav-link {
      text-decoration: none;
      color: #5f6368;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 4px;
      position: relative;
    }

    .nav-link mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    
    .nav-link:hover, .nav-link.active {
      color: #202124;
      background: #f1f3f4;
    }

    .nav-link.active {
      color: #003399; /* Royal Blue */
      background: #e6f0ff; /* Light Blue */
    }
    
    .nav-btn-primary {
      text-decoration: none;
      background: #003399; /* Royal Blue */
      color: white;
      padding: 10px 24px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s ease;
      height: 40px;
    }

    .nav-btn-primary:hover {
      background: #002266; /* Darker Blue */
      box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3);
    }

    .nav-btn-primary mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
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
        padding: 0 16px;
      }

      .brand-text img {
        height: 40px;
        width: 40px;
      }
    }

    @media (max-width: 480px) {
      .nav-content {
        padding: 0 12px;
      }

      .brand-text img {
        height: 36px;
        width: 36px;
      }

      .mobile-nav {
        width: 100%;
        max-width: 280px;
      }

      .nav-link {
        padding: 12px 16px;
      }

      .nav-btn-primary {
        padding: 12px 24px;
      }
    }
  `],
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 50;
    }
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 50;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
