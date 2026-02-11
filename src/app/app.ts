import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <!-- Show navbar only for non-dashboard routes -->
      @if (showNavbar) {
        <app-navbar></app-navbar>
      }

      <main class="main-content" [class.dashboard-mode]="!showNavbar">
        <router-outlet></router-outlet>
      </main>

      <!-- Show footer only for non-dashboard routes -->
      @if (showNavbar) {
        <app-footer></app-footer>
      }
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
    
    .main-content {
      flex: 1;
    }

    .main-content.dashboard-mode {
      padding: 0;
      margin: 0;
    }
  `],
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent],
  standalone: true
})
export class AppComponent {
  showNavbar = true;

  constructor(private router: Router) {
    // Listen to route changes to determine if we should show navbar/footer
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Hide navbar and footer for dashboard and login routes
      this.showNavbar = !event.url.includes('/dashboard') && !event.url.includes('/login');
    });
  }
}
