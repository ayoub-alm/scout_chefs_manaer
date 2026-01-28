import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface ChefCard {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    primaryCuisine: string; // Used as specialized field
    availabilityStatus: string;
    rating: number;
    statusDisplay?: string;
}

@Component({
    selector: 'app-member-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        BadgeModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        FormsModule
    ],
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
    chefs = signal<ChefCard[]>([]);
    loading = signal(false);
    searchValue = signal('');

    private allChefs: ChefCard[] = [
        {
            id: 1, firstName: 'أحمد', lastName: 'المرابط', email: 'ahmed.m@example.com', phone: '0612345678', city: 'الدار البيضاء',
            primaryCuisine: 'القيادة الميدانية', availabilityStatus: 'AVAILABLE', rating: 4.9
        },
        {
            id: 2, firstName: 'سلمى', lastName: 'الإدريسي', email: 'salma.i@example.com', phone: '0623456789', city: 'مراكش',
            primaryCuisine: 'التدريب', availabilityStatus: 'NEGOTIATING', rating: 4.7
        },
        {
            id: 3, firstName: 'يوسف', lastName: 'بنعلي', email: 'youssef.b@example.com', phone: '0634567890', city: 'الرباط',
            primaryCuisine: 'التخطيط', availabilityStatus: 'NOT_AVAILABLE', rating: 4.5
        },
        {
            id: 4, firstName: 'خديجة', lastName: 'السعدي', email: 'khadija.s@example.com', phone: '0645678901', city: 'فاس',
            primaryCuisine: 'التوجيه', availabilityStatus: 'AVAILABLE', rating: 4.8
        },
        {
            id: 5, firstName: 'عمر', lastName: 'الفاسي', email: 'omar.f@example.com', phone: '0656789012', city: 'طنجة',
            primaryCuisine: 'اللوجستيك', availabilityStatus: 'NEGOTIATING', rating: 4.6
        }
    ];

    constructor(private router: Router) {
        this.loadData();
    }

    loadData() {
        this.loading.set(true);
        // Simulate API delay
        setTimeout(() => {
            const data = this.allChefs.map(c => ({
                ...c,
                statusDisplay: this.getStatusDisplay(c.availabilityStatus)
            }));
            this.chefs.set(data);
            this.loading.set(false);
        }, 500);
    }

    filteredChefs = computed(() => {
        const search = this.searchValue().toLowerCase();
        return this.chefs().filter(c =>
            c.firstName.toLowerCase().includes(search) ||
            c.lastName.toLowerCase().includes(search) ||
            c.email.toLowerCase().includes(search) ||
            c.city.toLowerCase().includes(search)
        );
    });

    getStatusDisplay(status: string): string {
        const map: Record<string, string> = {
            'AVAILABLE': 'متاح',
            'NOT_AVAILABLE': 'غير متاح',
            'NEGOTIATING': 'قيد التفاوض'
        };
        return map[status] || status;
    }

    getSeverity(status: string): 'success' | 'warning' | 'danger' | 'info' | undefined {
        switch (status) {
            case 'AVAILABLE': return 'success';
            case 'NEGOTIATING': return 'warning';
            case 'NOT_AVAILABLE': return 'danger';
            default: return 'info';
        }
    }

    onRowSelect(chef: ChefCard) {
        this.router.navigate(['/dashboard/members', chef.id]);
    }
}
