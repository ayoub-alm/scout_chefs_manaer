import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface Training {
    id: number;
    title: string;
    category: 'leadership' | 'skills' | 'safety' | 'outdoor';
    instructor: string;
    duration: string;
    startDate: Date;
    endDate: Date;
    enrolled: number;
    capacity: number;
    status: 'planned' | 'active' | 'completed' | 'cancelled';
    level: 'beginner' | 'intermediate' | 'advanced';
}

@Component({
    selector: 'app-trainings-list',
    template: `
    <div class="trainings-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <mat-icon>school</mat-icon>
            إدارة التدريبات
          </h1>
          <p class="page-subtitle">إدارة وتنظيم جميع الدورات التدريبية والتكوينية</p>
        </div>
        <button mat-raised-button class="add-btn" (click)="openTrainingDialog()">
          <mat-icon>add</mat-icon>
          إضافة تدريب جديد
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon planned">
            <mat-icon>pending_actions</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getTrainingsByStatus('planned').length }}</span>
            <span class="stat-label">تدريبات مخططة</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon active">
            <mat-icon>play_lesson</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getTrainingsByStatus('active').length }}</span>
            <span class="stat-label">تدريبات نشطة</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon completed">
            <mat-icon>verified</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getTrainingsByStatus('completed').length }}</span>
            <span class="stat-label">تدريبات منتهية</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon total">
            <mat-icon>people_alt</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getTotalEnrolled() }}</span>
            <span class="stat-label">إجمالي المتدربين</span>
          </div>
        </div>
      </div>

      <!-- Trainings Table -->
      <mat-card class="table-card">
        <table mat-table [dataSource]="trainings()" class="trainings-table">
          <!-- Title Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>العنوان</th>
            <td mat-cell *matCellDef="let training">
              <div class="training-title-cell">
                <mat-icon class="training-icon">{{ getCategoryIcon(training.category) }}</mat-icon>
                <div>
                  <div class="training-title">{{ training.title }}</div>
                  <div class="training-subtitle">{{ training.instructor }}</div>
                </div>
              </div>
            </td>
          </ng-container>

          <!-- Category Column -->
          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>الفئة</th>
            <td mat-cell *matCellDef="let training">
              <mat-chip class="category-chip" [class]="'category-' + training.category">
                {{ getCategoryLabel(training.category) }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Level Column -->
          <ng-container matColumnDef="level">
            <th mat-header-cell *matHeaderCellDef>المستوى</th>
            <td mat-cell *matCellDef="let training">
              <mat-chip class="level-chip" [class]="'level-' + training.level">
                {{ getLevelLabel(training.level) }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Duration Column -->
          <ng-container matColumnDef="duration">
            <th mat-header-cell *matHeaderCellDef>المدة</th>
            <td mat-cell *matCellDef="let training">
              <div class="duration-cell">
                <mat-icon>schedule</mat-icon>
                <span>{{ training.duration }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Dates Column -->
          <ng-container matColumnDef="dates">
            <th mat-header-cell *matHeaderCellDef>التواريخ</th>
            <td mat-cell *matCellDef="let training">
              <div class="dates-cell">
                <div>{{ training.startDate | date:'dd/MM/yyyy' }}</div>
                <div class="date-separator">-</div>
                <div>{{ training.endDate | date:'dd/MM/yyyy' }}</div>
              </div>
            </td>
          </ng-container>

          <!-- Enrollment Column -->
          <ng-container matColumnDef="enrollment">
            <th mat-header-cell *matHeaderCellDef>التسجيل</th>
            <td mat-cell *matCellDef="let training">
              <div class="enrollment-cell">
                <div class="enrollment-text">
                  <span class="enrolled">{{ training.enrolled }}</span>
                  <span class="separator">/</span>
                  <span class="capacity">{{ training.capacity }}</span>
                </div>
                <mat-progress-bar 
                  mode="determinate" 
                  [value]="(training.enrolled / training.capacity) * 100"
                  [class]="getProgressClass(training.enrolled, training.capacity)">
                </mat-progress-bar>
              </div>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>الحالة</th>
            <td mat-cell *matCellDef="let training">
              <mat-chip class="status-chip" [class]="'status-' + training.status">
                {{ getStatusLabel(training.status) }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>الإجراءات</th>
            <td mat-cell *matCellDef="let training">
              <div class="actions-cell">
                <button mat-icon-button (click)="viewTraining(training)" matTooltip="عرض">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button (click)="editTraining(training)" matTooltip="تعديل">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="deleteTraining(training)" matTooltip="حذف" class="delete-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
        </table>

        @if (trainings().length === 0) {
          <div class="empty-state">
            <mat-icon>school_off</mat-icon>
            <h3>لا توجد تدريبات</h3>
            <p>ابدأ بإضافة تدريب جديد</p>
          </div>
        }
      </mat-card>
    </div>
  `,
    styles: [`
    .trainings-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      gap: 24px;
    }

    .page-title {
      font-size: 28px;
      font-weight: 400;
      color: #202124;
      margin: 0 0 8px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .page-title mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #5b2c8b;
    }

    .page-subtitle {
      font-size: 14px;
      color: #5f6368;
      margin: 0;
    }

    .add-btn {
      background: #5b2c8b;
      color: white;
      height: 40px;
      border-radius: 4px;
      font-weight: 500;
    }

    .add-btn:hover {
      background: #3d1d5c;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e8eaed;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.2s ease;
    }

    .stat-card:hover {
      box-shadow: 0 2px 8px rgba(60, 64, 67, 0.15);
      transform: translateY(-2px);
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .stat-icon.planned {
      background: #e3f2fd;
      color: #1a73e8;
    }

    .stat-icon.active {
      background: #fff3e0;
      color: #e37400;
    }

    .stat-icon.completed {
      background: #e8f5e9;
      color: #1e8e3e;
    }

    .stat-icon.total {
      background: #f3e8ff;
      color: #5b2c8b;
    }

    .stat-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 400;
      color: #202124;
      line-height: 1;
    }

    .stat-label {
      font-size: 13px;
      color: #5f6368;
      font-weight: 500;
    }

    .table-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e8eaed;
      box-shadow: none;
      overflow: hidden;
    }

    .trainings-table {
      width: 100%;
    }

    .trainings-table th {
      background: #f8f9fa;
      color: #5f6368;
      font-weight: 500;
      font-size: 13px;
      padding: 16px;
      text-align: right;
    }

    .trainings-table td {
      padding: 16px;
      color: #202124;
      font-size: 14px;
      border-bottom: 1px solid #e8eaed;
    }

    .table-row:hover {
      background: #f8f9fa;
    }

    .training-title-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .training-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: #5b2c8b;
      flex-shrink: 0;
    }

    .training-title {
      font-weight: 500;
      color: #202124;
    }

    .training-subtitle {
      font-size: 12px;
      color: #5f6368;
      margin-top: 2px;
    }

    .duration-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .duration-cell mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #5f6368;
    }

    .dates-cell {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }

    .date-separator {
      color: #5f6368;
    }

    .enrollment-cell {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 120px;
    }

    .enrollment-text {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
    }

    .enrolled {
      font-weight: 500;
      color: #5b2c8b;
    }

    .separator {
      color: #5f6368;
    }

    .capacity {
      color: #5f6368;
    }

    mat-progress-bar {
      height: 6px;
      border-radius: 3px;
    }

    ::ng-deep .progress-low .mdc-linear-progress__bar-inner {
      border-color: #1e8e3e !important;
    }

    ::ng-deep .progress-medium .mdc-linear-progress__bar-inner {
      border-color: #e37400 !important;
    }

    ::ng-deep .progress-high .mdc-linear-progress__bar-inner {
      border-color: #c5221f !important;
    }

    .category-chip, .level-chip, .status-chip {
      font-size: 12px;
      font-weight: 500;
      height: 24px;
      padding: 0 12px;
      border-radius: 12px;
    }

    .category-leadership {
      background: #f3e8ff;
      color: #5b2c8b;
    }

    .category-skills {
      background: #e3f2fd;
      color: #1a73e8;
    }

    .category-safety {
      background: #fce8e6;
      color: #c5221f;
    }

    .category-outdoor {
      background: #e8f5e9;
      color: #1e8e3e;
    }

    .level-beginner {
      background: #e8f5e9;
      color: #1e8e3e;
    }

    .level-intermediate {
      background: #fff3e0;
      color: #e37400;
    }

    .level-advanced {
      background: #fce8e6;
      color: #c5221f;
    }

    .status-planned {
      background: #e3f2fd;
      color: #1a73e8;
    }

    .status-active {
      background: #fff3e0;
      color: #e37400;
    }

    .status-completed {
      background: #e8f5e9;
      color: #1e8e3e;
    }

    .status-cancelled {
      background: #fce8e6;
      color: #c5221f;
    }

    .actions-cell {
      display: flex;
      gap: 4px;
    }

    .actions-cell button {
      color: #5f6368;
    }

    .actions-cell button:hover {
      color: #5b2c8b;
      background: #f3e8ff;
    }

    .delete-btn:hover {
      color: #c5221f !important;
      background: #fce8e6 !important;
    }

    .empty-state {
      padding: 60px 20px;
      text-align: center;
      color: #5f6368;
    }

    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      opacity: 0.3;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 18px;
      font-weight: 500;
      margin: 0 0 8px 0;
      color: #202124;
    }

    .empty-state p {
      font-size: 14px;
      margin: 0;
    }

    @media (max-width: 768px) {
      .trainings-container {
        padding: 16px;
      }

      .page-header {
        flex-direction: column;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .trainings-table {
        font-size: 13px;
      }

      .trainings-table th, .trainings-table td {
        padding: 12px 8px;
      }
    }
  `],
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule, MatChipsModule, MatProgressBarModule],
    standalone: true
})
export class TrainingsListComponent {
    displayedColumns: string[] = ['title', 'category', 'level', 'duration', 'dates', 'enrollment', 'status', 'actions'];

    trainings = signal<Training[]>([
        {
            id: 1,
            title: 'دورة القيادة الكشفية المتقدمة',
            category: 'leadership',
            instructor: 'القائد أحمد بن محمد',
            duration: '5 أيام',
            startDate: new Date('2026-03-01'),
            endDate: new Date('2026-03-05'),
            enrolled: 18,
            capacity: 25,
            status: 'planned',
            level: 'advanced'
        },
        {
            id: 2,
            title: 'مهارات البقاء في الطبيعة',
            category: 'outdoor',
            instructor: 'القائد فاطمة الزهراء',
            duration: '3 أيام',
            startDate: new Date('2026-02-15'),
            endDate: new Date('2026-02-17'),
            enrolled: 22,
            capacity: 30,
            status: 'active',
            level: 'intermediate'
        },
        {
            id: 3,
            title: 'الإسعافات الأولية والسلامة',
            category: 'safety',
            instructor: 'الدكتور محمد العربي',
            duration: '2 يوم',
            startDate: new Date('2026-01-20'),
            endDate: new Date('2026-01-21'),
            enrolled: 30,
            capacity: 30,
            status: 'completed',
            level: 'beginner'
        },
        {
            id: 4,
            title: 'تطوير المهارات الكشفية',
            category: 'skills',
            instructor: 'القائدة سارة بن علي',
            duration: '4 أيام',
            startDate: new Date('2026-04-10'),
            endDate: new Date('2026-04-13'),
            enrolled: 12,
            capacity: 20,
            status: 'planned',
            level: 'beginner'
        }
    ]);

    constructor(private dialog: MatDialog) { }

    getTrainingsByStatus(status: string): Training[] {
        return this.trainings().filter(training => training.status === status);
    }

    getTotalEnrolled(): number {
        return this.trainings().reduce((sum, training) => sum + training.enrolled, 0);
    }

    getCategoryIcon(category: string): string {
        const icons: Record<string, string> = {
            leadership: 'military_tech',
            skills: 'construction',
            safety: 'health_and_safety',
            outdoor: 'terrain'
        };
        return icons[category] || 'school';
    }

    getCategoryLabel(category: string): string {
        const labels: Record<string, string> = {
            leadership: 'قيادة',
            skills: 'مهارات',
            safety: 'سلامة',
            outdoor: 'خارجي'
        };
        return labels[category] || category;
    }

    getLevelLabel(level: string): string {
        const labels: Record<string, string> = {
            beginner: 'مبتدئ',
            intermediate: 'متوسط',
            advanced: 'متقدم'
        };
        return labels[level] || level;
    }

    getStatusLabel(status: string): string {
        const labels: Record<string, string> = {
            planned: 'مخطط',
            active: 'نشط',
            completed: 'منتهي',
            cancelled: 'ملغى'
        };
        return labels[status] || status;
    }

    getProgressClass(enrolled: number, capacity: number): string {
        const percentage = (enrolled / capacity) * 100;
        if (percentage < 60) return 'progress-low';
        if (percentage < 90) return 'progress-medium';
        return 'progress-high';
    }

    openTrainingDialog(training?: Training) {
        // TODO: Open dialog for add/edit
        console.log('Open training dialog', training);
    }

    viewTraining(training: Training) {
        console.log('View training', training);
    }

    editTraining(training: Training) {
        this.openTrainingDialog(training);
    }

    deleteTraining(training: Training) {
        if (confirm(`هل أنت متأكد من حذف التدريب "${training.title}"؟`)) {
            this.trainings.update(trainings => trainings.filter(t => t.id !== training.id));
        }
    }
}
