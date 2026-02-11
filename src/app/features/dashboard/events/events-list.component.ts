import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

export interface Event {
    id: number;
    title: string;
    type: 'camping' | 'formation' | 'meeting' | 'activity';
    date: Date;
    location: string;
    participants: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    description: string;
}

@Component({
    selector: 'app-events-list',
    template: `
    <div class="events-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <mat-icon>event</mat-icon>
            إدارة الفعاليات
          </h1>
          <p class="page-subtitle">إدارة وتنظيم جميع الفعاليات والأنشطة الكشفية</p>
        </div>
        <button mat-raised-button class="add-btn" (click)="openEventDialog()">
          <mat-icon>add</mat-icon>
          إضافة فعالية جديدة
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon upcoming">
            <mat-icon>schedule</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getEventsByStatus('upcoming').length }}</span>
            <span class="stat-label">فعاليات قادمة</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ongoing">
            <mat-icon>play_circle</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getEventsByStatus('ongoing').length }}</span>
            <span class="stat-label">فعاليات جارية</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon completed">
            <mat-icon>check_circle</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getEventsByStatus('completed').length }}</span>
            <span class="stat-label">فعاليات منتهية</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon total">
            <mat-icon>groups</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getTotalParticipants() }}</span>
            <span class="stat-label">إجمالي المشاركين</span>
          </div>
        </div>
      </div>

      <!-- Events Table -->
      <mat-card class="table-card">
        <table mat-table [dataSource]="events()" class="events-table">
          <!-- Title Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>العنوان</th>
            <td mat-cell *matCellDef="let event">
              <div class="event-title-cell">
                <mat-icon class="event-type-icon">{{ getEventIcon(event.type) }}</mat-icon>
                <span>{{ event.title }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>النوع</th>
            <td mat-cell *matCellDef="let event">
              <mat-chip class="type-chip" [class]="'type-' + event.type">
                {{ getEventTypeLabel(event.type) }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>التاريخ</th>
            <td mat-cell *matCellDef="let event">{{ event.date | date:'dd/MM/yyyy' }}</td>
          </ng-container>

          <!-- Location Column -->
          <ng-container matColumnDef="location">
            <th mat-header-cell *matHeaderCellDef>المكان</th>
            <td mat-cell *matCellDef="let event">
              <div class="location-cell">
                <mat-icon>location_on</mat-icon>
                <span>{{ event.location }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Participants Column -->
          <ng-container matColumnDef="participants">
            <th mat-header-cell *matHeaderCellDef>المشاركون</th>
            <td mat-cell *matCellDef="let event">
              <div class="participants-cell">
                <mat-icon>people</mat-icon>
                <span>{{ event.participants }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>الحالة</th>
            <td mat-cell *matCellDef="let event">
              <mat-chip class="status-chip" [class]="'status-' + event.status">
                {{ getStatusLabel(event.status) }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>الإجراءات</th>
            <td mat-cell *matCellDef="let event">
              <div class="actions-cell">
                <button mat-icon-button (click)="viewEvent(event)" matTooltip="عرض">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button (click)="editEvent(event)" matTooltip="تعديل">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="deleteEvent(event)" matTooltip="حذف" class="delete-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
        </table>

        @if (events().length === 0) {
          <div class="empty-state">
            <mat-icon>event_busy</mat-icon>
            <h3>لا توجد فعاليات</h3>
            <p>ابدأ بإضافة فعالية جديدة</p>
          </div>
        }
      </mat-card>
    </div>
  `,
    styles: [`
    .events-container {
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

    .stat-icon.upcoming {
      background: #e3f2fd;
      color: #1a73e8;
    }

    .stat-icon.ongoing {
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

    .events-table {
      width: 100%;
    }

    .events-table th {
      background: #f8f9fa;
      color: #5f6368;
      font-weight: 500;
      font-size: 13px;
      padding: 16px;
      text-align: right;
    }

    .events-table td {
      padding: 16px;
      color: #202124;
      font-size: 14px;
      border-bottom: 1px solid #e8eaed;
    }

    .table-row:hover {
      background: #f8f9fa;
    }

    .event-title-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
    }

    .event-type-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #5b2c8b;
    }

    .location-cell, .participants-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .location-cell mat-icon, .participants-cell mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #5f6368;
    }

    .type-chip, .status-chip {
      font-size: 12px;
      font-weight: 500;
      height: 24px;
      padding: 0 12px;
      border-radius: 12px;
    }

    .type-camping {
      background: #e8f5e9;
      color: #1e8e3e;
    }

    .type-formation {
      background: #e3f2fd;
      color: #1a73e8;
    }

    .type-meeting {
      background: #fff3e0;
      color: #e37400;
    }

    .type-activity {
      background: #f3e8ff;
      color: #5b2c8b;
    }

    .status-upcoming {
      background: #e3f2fd;
      color: #1a73e8;
    }

    .status-ongoing {
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
      .events-container {
        padding: 16px;
      }

      .page-header {
        flex-direction: column;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .events-table {
        font-size: 13px;
      }

      .events-table th, .events-table td {
        padding: 12px 8px;
      }
    }
  `],
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule, MatChipsModule],
    standalone: true
})
export class EventsListComponent {
    displayedColumns: string[] = ['title', 'type', 'date', 'location', 'participants', 'status', 'actions'];

    events = signal<Event[]>([
        {
            id: 1,
            title: 'مخيم الربيع الكشفي',
            type: 'camping',
            date: new Date('2026-03-15'),
            location: 'غابة بوزريعة',
            participants: 45,
            status: 'upcoming',
            description: 'مخيم كشفي ربيعي لمدة 3 أيام'
        },
        {
            id: 2,
            title: 'دورة القيادة الكشفية',
            type: 'formation',
            date: new Date('2026-02-20'),
            location: 'مقر الفوج',
            participants: 30,
            status: 'ongoing',
            description: 'دورة تدريبية في القيادة الكشفية'
        },
        {
            id: 3,
            title: 'اجتماع القادة الشهري',
            type: 'meeting',
            date: new Date('2026-02-10'),
            location: 'قاعة الاجتماعات',
            participants: 15,
            status: 'completed',
            description: 'اجتماع شهري لمناقشة الخطط'
        },
        {
            id: 4,
            title: 'نشاط خدمة المجتمع',
            type: 'activity',
            date: new Date('2026-04-05'),
            location: 'الحي السكني',
            participants: 25,
            status: 'upcoming',
            description: 'نشاط تطوعي لخدمة المجتمع'
        }
    ]);

    constructor(private dialog: MatDialog) { }

    getEventsByStatus(status: string): Event[] {
        return this.events().filter(event => event.status === status);
    }

    getTotalParticipants(): number {
        return this.events().reduce((sum, event) => sum + event.participants, 0);
    }

    getEventIcon(type: string): string {
        const icons: Record<string, string> = {
            camping: 'camping',
            formation: 'school',
            meeting: 'groups',
            activity: 'volunteer_activism'
        };
        return icons[type] || 'event';
    }

    getEventTypeLabel(type: string): string {
        const labels: Record<string, string> = {
            camping: 'مخيم',
            formation: 'تكوين',
            meeting: 'اجتماع',
            activity: 'نشاط'
        };
        return labels[type] || type;
    }

    getStatusLabel(status: string): string {
        const labels: Record<string, string> = {
            upcoming: 'قادم',
            ongoing: 'جاري',
            completed: 'منتهي',
            cancelled: 'ملغى'
        };
        return labels[status] || status;
    }

    openEventDialog(event?: Event) {
        // TODO: Open dialog for add/edit
        console.log('Open event dialog', event);
    }

    viewEvent(event: Event) {
        console.log('View event', event);
    }

    editEvent(event: Event) {
        this.openEventDialog(event);
    }

    deleteEvent(event: Event) {
        if (confirm(`هل أنت متأكد من حذف الفعالية "${event.title}"؟`)) {
            this.events.update(events => events.filter(e => e.id !== event.id));
        }
    }
}
