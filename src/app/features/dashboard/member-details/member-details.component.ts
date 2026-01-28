import { Component, signal, OnInit, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BadgeModule } from 'primeng/badge';
import { ActivatedRoute } from '@angular/router';

interface ChefCard {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    primaryCuisine: string;
    secondaryCuisines?: string;
    currentPosition?: string;
    yearsOfExperience: number;
    availabilityStatus: string;
    rating: number;
    notes?: string;
    statusDisplay?: string;
}

@Component({
    selector: 'app-member-details',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        BadgeModule
    ],
    templateUrl: './member-details.component.html',
    styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
    chef = signal<ChefCard | null>(null);
    id: number = 0;

    // Mock data (same as pool)
    private allChefs: ChefCard[] = [
        {
            id: 1, firstName: 'أحمد', lastName: 'المرابط', email: 'ahmed.m@example.com', phone: '0612345678', city: 'الدار البيضاء', country: 'المغرب',
            primaryCuisine: 'القيادة الميدانية', availabilityStatus: 'AVAILABLE', rating: 4.9, yearsOfExperience: 12,
            currentPosition: 'قائد فرقة', secondaryCuisines: 'التنظيم اللوجستي', notes: 'متخصص في إدارة الأنشطة الكبرى'
        },
        {
            id: 2, firstName: 'سلمى', lastName: 'الإدريسي', email: 'salma.i@example.com', phone: '0623456789', city: 'مراكش', country: 'المغرب',
            primaryCuisine: 'التدريب', availabilityStatus: 'NEGOTIATING', rating: 4.7, yearsOfExperience: 8,
            currentPosition: 'مدربة', secondaryCuisines: 'التواصل', notes: 'تركز على إعداد القادة الجدد'
        },
        {
            id: 3, firstName: 'يوسف', lastName: 'بنعلي', email: 'youssef.b@example.com', phone: '0634567890', city: 'الرباط', country: 'المغرب',
            primaryCuisine: 'التخطيط', availabilityStatus: 'NOT_AVAILABLE', rating: 4.5, yearsOfExperience: 10,
            currentPosition: 'منسق برامج', secondaryCuisines: 'البرمجة', notes: 'مسؤول عن تنسيق الفعاليات الوطنية'
        },
        {
            id: 4, firstName: 'خديجة', lastName: 'السعدي', email: 'khadija.s@example.com', phone: '0645678901', city: 'فاس', country: 'المغرب',
            primaryCuisine: 'التوجيه', availabilityStatus: 'AVAILABLE', rating: 4.8, yearsOfExperience: 9,
            currentPosition: 'مستشارة', secondaryCuisines: 'التقييم', notes: 'تقود برامج التوجيه للأعضاء الجدد'
        },
        {
            id: 5, firstName: 'عمر', lastName: 'الفاسي', email: 'omar.f@example.com', phone: '0656789012', city: 'طنجة', country: 'المغرب',
            primaryCuisine: 'اللوجستيك', availabilityStatus: 'NEGOTIATING', rating: 4.6, yearsOfExperience: 11,
            currentPosition: 'مسؤول لوجستيك', secondaryCuisines: 'التدريب', notes: 'خبرة قوية في إدارة المخيمات'
        }
    ];

    constructor(private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.id = +id;
                this.loadChef(this.id);
            }
        });
    }

    loadChef(id: number) {
        const found = this.allChefs.find(c => c.id === id);
        if (found) {
            this.chef.set({
                ...found,
                statusDisplay: this.getStatusDisplay(found.availabilityStatus)
            });
        }
    }

    goBack() {
        this.location.back();
    }

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
}
