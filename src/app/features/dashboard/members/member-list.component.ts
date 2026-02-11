import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MemberDialogComponent } from './member-dialog.component';

export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    specialization: string;
    status: 'available' | 'not_available' | 'negotiating';
    rating: number;
    joinDate: Date;
    age: number;
    experience: string;
}

@Component({
    selector: 'app-member-list',
    template: `
    <div class="members-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <mat-icon>group</mat-icon>
            إدارة الأعضاء
          </h1>
          <p class="page-subtitle">إدارة وتنظيم جميع أعضاء الفوج الكشفي</p>
        </div>
        <button mat-raised-button class="add-btn" (click)="openMemberDialog()">
          <mat-icon>add</mat-icon>
          إضافة عضو جديد
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon available">
            <mat-icon>check_circle</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getMembersByStatus('available').length }}</span>
            <span class="stat-label">أعضاء متاحون</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon negotiating">
            <mat-icon>pending</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getMembersByStatus('negotiating').length }}</span>
            <span class="stat-label">قيد التفاوض</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon not-available">
            <mat-icon>cancel</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ getMembersByStatus('not_available').length }}</span>
            <span class="stat-label">غير متاحين</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon total">
            <mat-icon>people</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ members().length }}</span>
            <span class="stat-label">إجمالي الأعضاء</span>
          </div>
        </div>
      </div>

      <!-- Members Table -->
      <mat-card class="table-card">
        <table mat-table [dataSource]="members()" class="members-table">
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>الاسم الكامل</th>
            <td mat-cell *matCellDef="let member">
              <div class="member-name-cell">
                <div class="member-avatar">{{ getInitials(member) }}</div>
                <div>
                  <div class="member-name">{{ member.firstName }} {{ member.lastName }}</div>
                  <div class="member-email">{{ member.email }}</div>
                </div>
              </div>
            </td>
          </ng-container>

          <!-- Contact Column -->
          <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef>الاتصال</th>
            <td mat-cell *matCellDef="let member">
              <div class="contact-cell">
                <div class="contact-item">
                  <mat-icon>phone</mat-icon>
                  <span>{{ member.phone }}</span>
                </div>
                <div class="contact-item">
                  <mat-icon>location_on</mat-icon>
                  <span>{{ member.city }}</span>
                </div>
              </div>
            </td>
          </ng-container>

          <!-- Specialization Column -->
          <ng-container matColumnDef="specialization">
            <th mat-header-cell *matHeaderCellDef>التخصص</th>
            <td mat-cell *matCellDef="let member">
              <mat-chip class="specialization-chip">
                {{ member.specialization }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Experience Column -->
          <ng-container matColumnDef="experience">
            <th mat-header-cell *matHeaderCellDef>الخبرة</th>
            <td mat-cell *matCellDef="let member">
              <div class="experience-cell">
                <mat-icon>work_history</mat-icon>
                <span>{{ member.experience }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Rating Column -->
          <ng-container matColumnDef="rating">
            <th mat-header-cell *matHeaderCellDef>التقييم</th>
            <td mat-cell *matCellDef="let member">
              <div class="rating-cell">
                <mat-icon class="star-icon">star</mat-icon>
                <span class="rating-value">{{ member.rating }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>الحالة</th>
            <td mat-cell *matCellDef="let member">
              <mat-chip class="status-chip" [class]="'status-' + member.status">
                {{ getStatusLabel(member.status) }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>الإجراءات</th>
            <td mat-cell *matCellDef="let member">
              <div class="actions-cell">
                <button mat-icon-button (click)="viewMember(member)" matTooltip="عرض">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button (click)="editMember(member)" matTooltip="تعديل">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="deleteMember(member)" matTooltip="حذف" class="delete-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
        </table>

        @if (members().length === 0) {
          <div class="empty-state">
            <mat-icon>people_outline</mat-icon>
            <h3>لا يوجد أعضاء</h3>
            <p>ابدأ بإضافة عضو جديد</p>
          </div>
        }
      </mat-card>
    </div>
  `,
    styles: [`
    .members-container {
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

    .stat-icon.available {
      background: #e8f5e9;
      color: #1e8e3e;
    }

    .stat-icon.negotiating {
      background: #fff3e0;
      color: #e37400;
    }

    .stat-icon.not-available {
      background: #fce8e6;
      color: #c5221f;
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

    .members-table {
      width: 100%;
    }

    .members-table th {
      background: #f8f9fa;
      color: #5f6368;
      font-weight: 500;
      font-size: 13px;
      padding: 16px;
      text-align: right;
    }

    .members-table td {
      padding: 16px;
      color: #202124;
      font-size: 14px;
      border-bottom: 1px solid #e8eaed;
    }

    .table-row:hover {
      background: #f8f9fa;
      cursor: pointer;
    }

    .member-name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .member-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #5b2c8b;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      flex-shrink: 0;
    }

    .member-name {
      font-weight: 500;
      color: #202124;
    }

    .member-email {
      font-size: 12px;
      color: #5f6368;
      margin-top: 2px;
    }

    .contact-cell {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
    }

    .contact-item mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #5f6368;
    }

    .specialization-chip {
      background: #f3e8ff;
      color: #5b2c8b;
      font-size: 12px;
      font-weight: 500;
      height: 24px;
      padding: 0 12px;
      border-radius: 12px;
    }

    .experience-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .experience-cell mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #5f6368;
    }

    .rating-cell {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .star-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #fbbc04;
    }

    .rating-value {
      font-weight: 500;
      color: #202124;
    }

    .status-chip {
      font-size: 12px;
      font-weight: 500;
      height: 24px;
      padding: 0 12px;
      border-radius: 12px;
    }

    .status-available {
      background: #e8f5e9;
      color: #1e8e3e;
    }

    .status-negotiating {
      background: #fff3e0;
      color: #e37400;
    }

    .status-not_available {
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
      .members-container {
        padding: 16px;
      }

      .page-header {
        flex-direction: column;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .members-table {
        font-size: 13px;
      }

      .members-table th, .members-table td {
        padding: 12px 8px;
      }
    }
  `],
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule, MatChipsModule],
    standalone: true
})
export class MemberListComponent {
    displayedColumns: string[] = ['name', 'contact', 'specialization', 'experience', 'rating', 'status', 'actions'];

    members = signal<Member[]>([
        {
            id: 1,
            firstName: 'أحمد',
            lastName: 'المرابط',
            email: 'ahmed.m@example.com',
            phone: '0612345678',
            city: 'الدار البيضاء',
            specialization: 'القيادة الميدانية',
            status: 'available',
            rating: 4.9,
            joinDate: new Date('2020-01-15'),
            age: 28,
            experience: '5 سنوات'
        },
        {
            id: 2,
            firstName: 'سلمى',
            lastName: 'الإدريسي',
            email: 'salma.i@example.com',
            phone: '0623456789',
            city: 'مراكش',
            specialization: 'التدريب',
            status: 'negotiating',
            rating: 4.7,
            joinDate: new Date('2019-06-20'),
            age: 26,
            experience: '4 سنوات'
        },
        {
            id: 3,
            firstName: 'يوسف',
            lastName: 'بنعلي',
            email: 'youssef.b@example.com',
            phone: '0634567890',
            city: 'الرباط',
            specialization: 'التخطيط',
            status: 'not_available',
            rating: 4.5,
            joinDate: new Date('2021-03-10'),
            age: 30,
            experience: '6 سنوات'
        },
        {
            id: 4,
            firstName: 'خديجة',
            lastName: 'السعدي',
            email: 'khadija.s@example.com',
            phone: '0645678901',
            city: 'فاس',
            specialization: 'التوجيه',
            status: 'available',
            rating: 4.8,
            joinDate: new Date('2018-09-05'),
            age: 32,
            experience: '7 سنوات'
        },
        {
            id: 5,
            firstName: 'عمر',
            lastName: 'الفاسي',
            email: 'omar.f@example.com',
            phone: '0656789012',
            city: 'طنجة',
            specialization: 'اللوجستيك',
            status: 'negotiating',
            rating: 4.6,
            joinDate: new Date('2020-11-22'),
            age: 27,
            experience: '3 سنوات'
        }
    ]);

    constructor(
        private router: Router,
        private dialog: MatDialog
    ) { }

    getMembersByStatus(status: string): Member[] {
        return this.members().filter(member => member.status === status);
    }

    getInitials(member: Member): string {
        return member.firstName.charAt(0) + member.lastName.charAt(0);
    }

    getStatusLabel(status: string): string {
        const labels: Record<string, string> = {
            available: 'متاح',
            not_available: 'غير متاح',
            negotiating: 'قيد التفاوض'
        };
        return labels[status] || status;
    }

    openMemberDialog(member?: Member) {
        const dialogRef = this.dialog.open(MemberDialogComponent, {
            width: '600px',
            data: member || null,
            direction: 'rtl'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (member) {
                    // Update existing member
                    this.members.update(members =>
                        members.map(m => m.id === member.id ? { ...m, ...result } : m)
                    );
                } else {
                    // Add new member
                    const newMember: Member = {
                        ...result,
                        id: Math.max(...this.members().map(m => m.id)) + 1,
                        joinDate: new Date()
                    };
                    this.members.update(members => [...members, newMember]);
                }
            }
        });
    }

    viewMember(member: Member) {
        this.router.navigate(['/dashboard/members', member.id]);
    }

    editMember(member: Member) {
        this.openMemberDialog(member);
    }

    deleteMember(member: Member) {
        if (confirm(`هل أنت متأكد من حذف العضو "${member.firstName} ${member.lastName}"؟`)) {
            this.members.update(members => members.filter(m => m.id !== member.id));
        }
    }
}
