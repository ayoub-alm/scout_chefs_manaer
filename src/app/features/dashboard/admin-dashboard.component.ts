import { Component, signal, effect, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Chef } from '../../services/api.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface ChefCard extends Chef {
  statusDisplay: string;
}

interface ChartDataset {
  data: number[];
  label: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  hoverBackgroundColor?: string | string[];
  borderWidth?: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [
    CommonModule,
    CardModule,
    BadgeModule,
    ButtonModule,
    TableModule,
    RouterLink,
    BaseChartDirective,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  standalone: true
})
export class AdminDashboardComponent {
  private readonly platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  chefs = signal<ChefCard[]>([]);
  loading = signal(false);
  error = signal('');
  totalRecords = signal(0);
  rows = signal(10);
  currentPage = signal(0);
  selectedChef: ChefCard | null = null;
  sidebarOpen = signal(true);
  private mockMembers: ChefCard[] = [
    {
      id: 1,
      firstName: 'أحمد',
      lastName: 'المرابط',
      email: 'ahmed.m@example.com',
      phone: '0612345678',
      country: 'المغرب',
      city: 'الدار البيضاء',
      yearsOfExperience: 12,
      primaryCuisine: 'القيادة الميدانية',
      secondaryCuisines: 'التنظيم اللوجستي',
      currentPosition: 'قائد فرقة',
      currentRestaurant: '',
      availabilityStatus: 'AVAILABLE',
      expectedSalaryRange: '',
      rating: 4.9,
      notes: 'متخصص في إدارة الأنشطة الكبرى',
      createdAt: '',
      updatedAt: '',
      statusDisplay: ''
    },
    {
      id: 2,
      firstName: 'سلمى',
      lastName: 'الإدريسي',
      email: 'salma.i@example.com',
      phone: '0623456789',
      country: 'المغرب',
      city: 'مراكش',
      yearsOfExperience: 8,
      primaryCuisine: 'التدريب',
      secondaryCuisines: 'التواصل',
      currentPosition: 'مدربة',
      currentRestaurant: '',
      availabilityStatus: 'NEGOTIATING',
      expectedSalaryRange: '',
      rating: 4.7,
      notes: 'تركز على إعداد القادة الجدد',
      createdAt: '',
      updatedAt: '',
      statusDisplay: ''
    },
    {
      id: 3,
      firstName: 'يوسف',
      lastName: 'بنعلي',
      email: 'youssef.b@example.com',
      phone: '0634567890',
      country: 'المغرب',
      city: 'الرباط',
      yearsOfExperience: 10,
      primaryCuisine: 'التخطيط',
      secondaryCuisines: 'البرمجة',
      currentPosition: 'منسق برامج',
      currentRestaurant: '',
      availabilityStatus: 'NOT_AVAILABLE',
      expectedSalaryRange: '',
      rating: 4.5,
      notes: 'مسؤول عن تنسيق الفعاليات الوطنية',
      createdAt: '',
      updatedAt: '',
      statusDisplay: ''
    },
    {
      id: 4,
      firstName: 'خديجة',
      lastName: 'السعدي',
      email: 'khadija.s@example.com',
      phone: '0645678901',
      country: 'المغرب',
      city: 'فاس',
      yearsOfExperience: 9,
      primaryCuisine: 'التوجيه',
      secondaryCuisines: 'التقييم',
      currentPosition: 'مستشارة',
      currentRestaurant: '',
      availabilityStatus: 'AVAILABLE',
      expectedSalaryRange: '',
      rating: 4.8,
      notes: 'تقود برامج التوجيه للأعضاء الجدد',
      createdAt: '',
      updatedAt: '',
      statusDisplay: ''
    },
    {
      id: 5,
      firstName: 'عمر',
      lastName: 'الفاسي',
      email: 'omar.f@example.com',
      phone: '0656789012',
      country: 'المغرب',
      city: 'طنجة',
      yearsOfExperience: 11,
      primaryCuisine: 'اللوجستيك',
      secondaryCuisines: 'التدريب',
      currentPosition: 'مسؤول لوجستيك',
      currentRestaurant: '',
      availabilityStatus: 'NEGOTIATING',
      expectedSalaryRange: '',
      rating: 4.6,
      notes: 'خبرة قوية في إدارة المخيمات',
      createdAt: '',
      updatedAt: '',
      statusDisplay: ''
    }
  ];

  // Derived values exposed to the template as signals/computeds
  availableCount = computed(() => this.chefs().filter(c => c.availabilityStatus === 'AVAILABLE').length);
  negotiatingCount = computed(() => this.chefs().filter(c => c.availabilityStatus === 'NEGOTIATING').length);
  notAvailableCount = computed(() => this.chefs().filter(c => c.availabilityStatus === 'NOT_AVAILABLE').length);
  averageRating = computed(() => {
    const list = this.chefs();
    const len = list?.length || 0;
    if (len === 0) return 0;
    const sum = list.reduce((acc, c) => acc + (c.rating ?? 0), 0);
    return sum / len;
  });

  // Chart colors - Blue, Gold, Green theme
  chartColors = {
    backgroundColor: [
      '#2196F3', // Blue 500 (Primary)
      '#ffc107', // Amber/Gold (Secondary)
      '#00c853', // Green (Accent)
      '#64B5F6', // Light Blue
      '#fff350', // Light Gold
      '#5efc82', // Light Green
      '#1976D2', // Dark Blue
      '#c79100', // Dark Gold
    ],
    borderColor: [
      '#1976D2', // Dark Blue
      '#c79100', // Dark Gold
      '#009624', // Dark Green
      '#2196F3', // Deep Blue
      '#ffc107', // Amber
      '#00c853', // Green
      '#1565C0', // Blue
      '#ffb300', // Gold
    ],
    hoverBackgroundColor: [
      '#64B5F6', // Light Blue
      '#fff350', // Light Gold
      '#5efc82', // Light Green
      '#8e82f3', // Very Light Blue
      '#ffff8d', // Very Light Gold
      '#9cffb4', // Very Light Green
      '#2196F3', // Deep Blue
      '#ffc107', // Amber
    ]
  };

  // Chart options
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  // Charts data
  statusChartLabels: string[] = [];
  statusChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  statusChartType: ChartType = 'bar';

  cuisineChartLabels: string[] = [];
  cuisineChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: []
  };
  cuisineChartType: ChartType = 'polarArea';

  ratingChartLabels: string[] = [];
  ratingChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  ratingChartType: ChartType = 'bar';

  constructor() {
    effect(() => {
      this.loadChefs();
    });
  }

  loadChefs(page: number = 0) {
    this.loading.set(true);
    this.error.set('');

    const start = page * this.rows();
    const end = start + this.rows();
    const pageData = this.mockMembers.slice(start, end).map((chef) => ({
      ...chef,
      statusDisplay: this.getStatusDisplay(chef.availabilityStatus)
    }));

    this.chefs.set(pageData);
    this.totalRecords.set(this.mockMembers.length);
    this.currentPage.set(page);
    this.selectedChef = null;
    this.loading.set(false);

    // Update charts after loading chefs
    this.updateCharts();
  }

  updateCharts() {
    this.updateStatusChart();
    this.updateCuisineChart();
    this.updateRatingChart();
  }

  updateStatusChart() {
    const statusCounts: { [key: string]: number } = {
      'متاحون': this.availableCount(),
      'قيد التفاوض': this.negotiatingCount(),
      'غير متاح': this.notAvailableCount()
    };

    this.statusChartLabels = Object.keys(statusCounts);
    this.statusChartData = {
      labels: this.statusChartLabels,
      datasets: [{
        data: Object.values(statusCounts),
        label: 'الأعضاء حسب الحالة',
        backgroundColor: [this.chartColors.backgroundColor[2], this.chartColors.backgroundColor[1], this.chartColors.backgroundColor[6]], // Green, Gold, Dark Blue
        borderColor: [this.chartColors.borderColor[2], this.chartColors.borderColor[1], this.chartColors.borderColor[6]],
        hoverBackgroundColor: [this.chartColors.hoverBackgroundColor[2], this.chartColors.hoverBackgroundColor[1], this.chartColors.hoverBackgroundColor[6]],
        borderWidth: 2
      }]
    };
  }

  updateCuisineChart() {
    const cuisineCounts: { [key: string]: number } = {};
    this.chefs().forEach(chef => {
      const cuisine = chef.primaryCuisine || 'Unknown';
      cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
    });

    // Sort by count and take top 8
    const sortedCuisines = Object.entries(cuisineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    this.cuisineChartLabels = sortedCuisines.map(([cuisine]) => cuisine);
    this.cuisineChartData = {
      labels: this.cuisineChartLabels,
      datasets: [{
        data: sortedCuisines.map(([, count]) => count),
        label: 'الأعضاء حسب التخصص',
        backgroundColor: this.chartColors.backgroundColor,
        borderColor: this.chartColors.borderColor,
        hoverBackgroundColor: this.chartColors.hoverBackgroundColor,
        borderWidth: 2
      }]
    };
  }

  updateRatingChart() {
    const ratingCounts: { [key: string]: number } = {
      '5 نجوم': 0,
      '4 - 5 نجوم': 0,
      '3 - 4 نجوم': 0,
      '2 - 3 نجوم': 0,
      '1 - 2 نجوم': 0,
      'بدون تقييم': 0
    };

    this.chefs().forEach(chef => {
      const rating = chef.rating || 0;
      if (rating === 0) {
        ratingCounts['No Rating']++;
      } else if (rating >= 5) {
        ratingCounts['5 Stars']++;
      } else if (rating >= 4) {
        ratingCounts['4-5 Stars']++;
      } else if (rating >= 3) {
        ratingCounts['3-4 Stars']++;
      } else if (rating >= 2) {
        ratingCounts['2-3 Stars']++;
      } else {
        ratingCounts['1-2 Stars']++;
      }
    });

    this.ratingChartLabels = Object.keys(ratingCounts);
    this.ratingChartData = {
      labels: this.ratingChartLabels,
      datasets: [{
        data: Object.values(ratingCounts),
        label: 'الأعضاء حسب التقييم',
        backgroundColor: this.chartColors.backgroundColor,
        borderColor: this.chartColors.borderColor,
        hoverBackgroundColor: this.chartColors.hoverBackgroundColor,
        borderWidth: 2
      }]
    };
  }

  getStatusDisplay(status: string): string {
    const statusMap: { [key: string]: string } = {
      'AVAILABLE': 'متاح',
      'NOT_AVAILABLE': 'غير متاح',
      'NEGOTIATING': 'قيد التفاوض',
      'UNKNOWN': 'غير متاح'
    };
    return statusMap[status] || 'غير متاح';
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'متاح':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'قيد التفاوض':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'غير متاح':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
  }

  getBadgeSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' | null {
    switch (status) {
      case 'متاح':
        return 'success';
      case 'قيد التفاوض':
        return 'warning';
      case 'غير متاح':
        return 'info';
      default:
        return null;
    }
  }

  onPageChange(event: any) {
    this.loadChefs(event.first / event.rows);
  }

  deleteChef(id: number) {
    if (confirm('هل أنت متأكد من حذف العضو؟')) {
      this.mockMembers = this.mockMembers.filter((member) => member.id !== id);
      this.loadChefs(this.currentPage());
    }
  }

  viewDetails(chef: ChefCard) {
    this.selectedChef = chef;
  }

  onRowSelect(event: any) {
    this.selectedChef = event.data;
  }

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }
}