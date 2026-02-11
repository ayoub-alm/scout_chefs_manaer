import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { Member } from '../members/member-list.component';

@Component({
    selector: 'app-member-details',
    template: `
    <div class="details-container">
      @if (member()) {
        <!-- Header -->
        <div class="details-header">
          <button mat-icon-button (click)="goBack()" class="back-btn">
            <mat-icon>arrow_forward</mat-icon>
          </button>
          <h1 class="page-title">تفاصيل العضو</h1>
          <div class="header-actions">
            <button mat-raised-button (click)="editMember()" class="edit-btn">
              <mat-icon>edit</mat-icon>
              تعديل
            </button>
          </div>
        </div>

        <!-- Profile Card -->
        <mat-card class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              {{ getInitials(member()!) }}
            </div>
            <div class="profile-info">
              <h2 class="member-name">{{ member()!.firstName }} {{ member()!.lastName }}</h2>
              <p class="member-email">{{ member()!.email }}</p>
              <mat-chip class="status-chip" [class]="'status-' + member()!.status">
                {{ getStatusLabel(member()!.status) }}
              </mat-chip>
            </div>
            <div class="profile-rating">
              <div class="rating-box">
                <mat-icon class="star-icon">star</mat-icon>
                <span class="rating-value">{{ member()!.rating }}</span>
              </div>
              <span class="rating-label">التقييم</span>
            </div>
          </div>
        </mat-card>

        <!-- Tabs -->
        <mat-tab-group class="details-tabs" animationDuration="300ms">
          <!-- Overview Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>info</mat-icon>
              معلومات عامة
            </ng-template>
            <div class="tab-content">
              <div class="info-grid">
                <div class="info-card">
                  <div class="info-icon">
                    <mat-icon>phone</mat-icon>
                  </div>
                  <div class="info-content">
                    <span class="info-label">رقم الهاتف</span>
                    <span class="info-value">{{ member()!.phone }}</span>
                  </div>
                </div>

                <div class="info-card">
                  <div class="info-icon">
                    <mat-icon>location_on</mat-icon>
                  </div>
                  <div class="info-content">
                    <span class="info-label">المدينة</span>
                    <span class="info-value">{{ member()!.city }}</span>
                  </div>
                </div>

                <div class="info-card">
                  <div class="info-icon">
                    <mat-icon>cake</mat-icon>
                  </div>
                  <div class="info-content">
                    <span class="info-label">العمر</span>
                    <span class="info-value">{{ member()!.age }} سنة</span>
                  </div>
                </div>

                <div class="info-card">
                  <div class="info-icon">
                    <mat-icon>work</mat-icon>
                  </div>
                  <div class="info-content">
                    <span class="info-label">التخصص</span>
                    <span class="info-value">{{ member()!.specialization }}</span>
                  </div>
                </div>

                <div class="info-card">
                  <div class="info-icon">
                    <mat-icon>work_history</mat-icon>
                  </div>
                  <div class="info-content">
                    <span class="info-label">الخبرة</span>
                    <span class="info-value">{{ member()!.experience }}</span>
                  </div>
                </div>

                <div class="info-card">
                  <div class="info-icon">
                    <mat-icon>event</mat-icon>
                  </div>
                  <div class="info-content">
                    <span class="info-label">تاريخ الانضمام</span>
                    <span class="info-value">{{ member()!.joinDate | date:'dd/MM/yyyy' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </mat-tab>

          <!-- Activities Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>event</mat-icon>
              الفعاليات
            </ng-template>
            <div class="tab-content">
              <div class="empty-state">
                <mat-icon>event_busy</mat-icon>
                <h3>لا توجد فعاليات</h3>
                <p>لم يشارك هذا العضو في أي فعاليات بعد</p>
              </div>
            </div>
          </mat-tab>

          <!-- Trainings Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>school</mat-icon>
              التدريبات
            </ng-template>
            <div class="tab-content">
              <div class="empty-state">
                <mat-icon>school_off</mat-icon>
                <h3>لا توجد تدريبات</h3>
                <p>لم يسجل هذا العضو في أي تدريبات بعد</p>
              </div>
            </div>
          </mat-tab>

          <!-- History Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>history</mat-icon>
              السجل
            </ng-template>
            <div class="tab-content">
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <mat-icon>person_add</mat-icon>
                  </div>
                  <div class="timeline-content">
                    <h4>انضمام العضو</h4>
                    <p>انضم إلى الفوج الكشفي</p>
                    <span class="timeline-date">{{ member()!.joinDate | date:'dd/MM/yyyy' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      } @else {
        <div class="loading-state">
          <mat-icon>person_search</mat-icon>
          <h3>جاري التحميل...</h3>
        </div>
      }
    </div>
  `,
    styles: [`
    .details-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .details-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .back-btn {
      color: #5f6368;
    }

    .back-btn:hover {
      background: #f1f3f4;
    }

    .page-title {
      font-size: 24px;
      font-weight: 400;
      color: #202124;
      margin: 0;
      flex: 1;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .edit-btn {
      background: #5b2c8b;
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .edit-btn:hover {
      background: #3d1d5c;
    }

    .profile-card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e8eaed;
      box-shadow: none;
      padding: 32px;
      margin-bottom: 24px;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #5b2c8b;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 500;
      flex-shrink: 0;
    }

    .profile-info {
      flex: 1;
    }

    .member-name {
      font-size: 28px;
      font-weight: 400;
      color: #202124;
      margin: 0 0 8px 0;
    }

    .member-email {
      font-size: 14px;
      color: #5f6368;
      margin: 0 0 12px 0;
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

    .profile-rating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .rating-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: #f3e8ff;
      border-radius: 8px;
    }

    .star-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: #fbbc04;
    }

    .rating-value {
      font-size: 24px;
      font-weight: 500;
      color: #202124;
    }

    .rating-label {
      font-size: 12px;
      color: #5f6368;
      font-weight: 500;
    }

    .details-tabs {
      background: white;
      border-radius: 8px;
      border: 1px solid #e8eaed;
      overflow: hidden;
    }

    ::ng-deep .mat-mdc-tab-labels {
      background: #f8f9fa;
      border-bottom: 1px solid #e8eaed;
    }

    ::ng-deep .mat-mdc-tab .mdc-tab__text-label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #5f6368;
    }

    ::ng-deep .mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
      color: #5b2c8b;
    }

    ::ng-deep .mat-mdc-tab-header {
      border-bottom: none;
    }

    ::ng-deep .mdc-tab-indicator__content--underline {
      border-color: #5b2c8b;
      border-top-width: 3px;
    }

    .tab-content {
      padding: 24px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }

    .info-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e8eaed;
    }

    .info-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #f3e8ff;
      color: #5b2c8b;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 12px;
      color: #5f6368;
      font-weight: 500;
    }

    .info-value {
      font-size: 16px;
      color: #202124;
      font-weight: 500;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .timeline-item {
      display: flex;
      gap: 16px;
      position: relative;
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      right: 23px;
      top: 48px;
      bottom: -24px;
      width: 2px;
      background: #e8eaed;
    }

    .timeline-item:last-child::before {
      display: none;
    }

    .timeline-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #f3e8ff;
      color: #5b2c8b;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      z-index: 1;
    }

    .timeline-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .timeline-content {
      flex: 1;
      padding-top: 4px;
    }

    .timeline-content h4 {
      font-size: 16px;
      font-weight: 500;
      color: #202124;
      margin: 0 0 4px 0;
    }

    .timeline-content p {
      font-size: 14px;
      color: #5f6368;
      margin: 0 0 8px 0;
    }

    .timeline-date {
      font-size: 12px;
      color: #80868b;
    }

    .empty-state, .loading-state {
      padding: 60px 20px;
      text-align: center;
      color: #5f6368;
    }

    .empty-state mat-icon, .loading-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      opacity: 0.3;
      margin-bottom: 16px;
    }

    .empty-state h3, .loading-state h3 {
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
      .details-container {
        padding: 16px;
      }

      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .profile-info {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, MatTabsModule],
    standalone: true
})
export class MemberDetailsComponent implements OnInit {
    member = signal<Member | null>(null);

    // Sample data - in real app, fetch from service
    private members: Member[] = [
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
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const foundMember = this.members.find(m => m.id === id);
        if (foundMember) {
            this.member.set(foundMember);
        } else {
            this.router.navigate(['/dashboard/members']);
        }
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

    goBack() {
        this.router.navigate(['/dashboard/members']);
    }

    editMember() {
        // TODO: Open edit dialog
        console.log('Edit member', this.member());
    }
}
