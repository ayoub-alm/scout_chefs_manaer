import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
    selector: 'app-dashboard-overview',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        MatCardModule,
        MatIconModule,
        BaseChartDirective
    ],
    templateUrl: './dashboard-overview.component.html',
    styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent {
    private readonly platformId = inject(PLATFORM_ID);
    isBrowser = isPlatformBrowser(this.platformId);

    // Mock Stats
    totalRecords = signal(150);
    availableCount = signal(45);
    negotiatingCount = signal(12);
    averageRating = signal(4.8);

    // Chart Logic (Simplified from original)
    chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' }
        }
    };

    statusChartData: ChartData<'bar'> = {
        labels: ['متاح', 'قيد التفاوض', 'غير متاح'],
        datasets: [{
            data: [45, 12, 93],
            label: 'الحالة',
            backgroundColor: ['#4caf50', '#ffc107', '#f44336']
        }]
    };
}
