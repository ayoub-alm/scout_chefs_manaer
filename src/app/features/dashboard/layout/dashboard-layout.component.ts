import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatIconModule,
        MatButtonModule
    ]
})
export class DashboardLayoutComponent {
    sidebarOpen = signal(false); // Default to closed for mobile-first safety, will update in constructor

    constructor() {
        // Initialize based on screen width
        this.checkScreenSize();

        // Listen for resize events
        window.addEventListener('resize', () => {
            this.checkScreenSize();
        });
    }

    private checkScreenSize() {
        const isMobile = window.innerWidth <= 1024;
        // logic: if mobile, default closed. if desktop, default open.
        // We only want to AUTO-change this on crossing the threshold, but for now simple sync is okay 
        // or we just set initial state.
        // A better approach for the 'signal' is to just let the user toggle it, 
        // but start with the right default.
        if (this.sidebarOpen() && isMobile) {
            this.sidebarOpen.set(false);
        } else if (!this.sidebarOpen() && !isMobile) {
            this.sidebarOpen.set(true);
        }
    }

    toggleSidebar() {
        this.sidebarOpen.update((v) => !v);
    }

    closeSidebar() {
        if (window.innerWidth <= 1024) {
            this.sidebarOpen.set(false);
        }
    }
}
