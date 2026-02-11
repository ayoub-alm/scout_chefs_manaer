import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Member } from './member-list.component';

@Component({
    selector: 'app-member-dialog',
    template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 mat-dialog-title>
          <mat-icon>{{ data ? 'edit' : 'person_add' }}</mat-icon>
          {{ data ? 'تعديل عضو' : 'إضافة عضو جديد' }}
        </h2>
        <button mat-icon-button (click)="onCancel()" class="close-btn">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content>
        <form [formGroup]="memberForm" class="member-form">
          <!-- Name Fields -->
          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الاسم الأول</mat-label>
              <mat-icon matPrefix>person</mat-icon>
              <input matInput formControlName="firstName" placeholder="أدخل الاسم الأول">
              @if (memberForm.get('firstName')?.hasError('required') && memberForm.get('firstName')?.touched) {
                <mat-error>الاسم الأول مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الاسم الأخير</mat-label>
              <mat-icon matPrefix>person</mat-icon>
              <input matInput formControlName="lastName" placeholder="أدخل الاسم الأخير">
              @if (memberForm.get('lastName')?.hasError('required') && memberForm.get('lastName')?.touched) {
                <mat-error>الاسم الأخير مطلوب</mat-error>
              }
            </mat-form-field>
          </div>

          <!-- Contact Fields -->
          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>البريد الإلكتروني</mat-label>
              <mat-icon matPrefix>email</mat-icon>
              <input matInput formControlName="email" type="email" placeholder="example@email.com">
              @if (memberForm.get('email')?.hasError('required') && memberForm.get('email')?.touched) {
                <mat-error>البريد الإلكتروني مطلوب</mat-error>
              }
              @if (memberForm.get('email')?.hasError('email') && memberForm.get('email')?.touched) {
                <mat-error>البريد الإلكتروني غير صحيح</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>رقم الهاتف</mat-label>
              <mat-icon matPrefix>phone</mat-icon>
              <input matInput formControlName="phone" placeholder="06XXXXXXXX">
              @if (memberForm.get('phone')?.hasError('required') && memberForm.get('phone')?.touched) {
                <mat-error>رقم الهاتف مطلوب</mat-error>
              }
            </mat-form-field>
          </div>

          <!-- Location & Age -->
          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>المدينة</mat-label>
              <mat-icon matPrefix>location_on</mat-icon>
              <input matInput formControlName="city" placeholder="أدخل المدينة">
              @if (memberForm.get('city')?.hasError('required') && memberForm.get('city')?.touched) {
                <mat-error>المدينة مطلوبة</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>العمر</mat-label>
              <mat-icon matPrefix>cake</mat-icon>
              <input matInput formControlName="age" type="number" placeholder="أدخل العمر">
              @if (memberForm.get('age')?.hasError('required') && memberForm.get('age')?.touched) {
                <mat-error>العمر مطلوب</mat-error>
              }
            </mat-form-field>
          </div>

          <!-- Specialization & Experience -->
          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>التخصص</mat-label>
              <mat-icon matPrefix>work</mat-icon>
              <mat-select formControlName="specialization">
                <mat-option value="القيادة الميدانية">القيادة الميدانية</mat-option>
                <mat-option value="التدريب">التدريب</mat-option>
                <mat-option value="التخطيط">التخطيط</mat-option>
                <mat-option value="التوجيه">التوجيه</mat-option>
                <mat-option value="اللوجستيك">اللوجستيك</mat-option>
                <mat-option value="الإسعافات الأولية">الإسعافات الأولية</mat-option>
                <mat-option value="النشاطات الرياضية">النشاطات الرياضية</mat-option>
              </mat-select>
              @if (memberForm.get('specialization')?.hasError('required') && memberForm.get('specialization')?.touched) {
                <mat-error>التخصص مطلوب</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الخبرة</mat-label>
              <mat-icon matPrefix>work_history</mat-icon>
              <input matInput formControlName="experience" placeholder="مثال: 5 سنوات">
              @if (memberForm.get('experience')?.hasError('required') && memberForm.get('experience')?.touched) {
                <mat-error>الخبرة مطلوبة</mat-error>
              }
            </mat-form-field>
          </div>

          <!-- Status & Rating -->
          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>الحالة</mat-label>
              <mat-icon matPrefix>info</mat-icon>
              <mat-select formControlName="status">
                <mat-option value="available">متاح</mat-option>
                <mat-option value="not_available">غير متاح</mat-option>
                <mat-option value="negotiating">قيد التفاوض</mat-option>
              </mat-select>
              @if (memberForm.get('status')?.hasError('required') && memberForm.get('status')?.touched) {
                <mat-error>الحالة مطلوبة</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>التقييم</mat-label>
              <mat-icon matPrefix>star</mat-icon>
              <input matInput formControlName="rating" type="number" step="0.1" min="0" max="5" placeholder="0.0 - 5.0">
              @if (memberForm.get('rating')?.hasError('required') && memberForm.get('rating')?.touched) {
                <mat-error>التقييم مطلوب</mat-error>
              }
              @if (memberForm.get('rating')?.hasError('min') || memberForm.get('rating')?.hasError('max')) {
                <mat-error>التقييم يجب أن يكون بين 0 و 5</mat-error>
              }
            </mat-form-field>
          </div>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button (click)="onCancel()" class="cancel-btn">
          إلغاء
        </button>
        <button mat-raised-button (click)="onSave()" [disabled]="!memberForm.valid" class="save-btn">
          <mat-icon>{{ data ? 'save' : 'add' }}</mat-icon>
          {{ data ? 'حفظ التعديلات' : 'إضافة العضو' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
    styles: [`
    .dialog-container {
      direction: rtl;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      border-bottom: 1px solid #e8eaed;
      margin: -24px -24px 0 -24px;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      color: #202124;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    h2 mat-icon {
      color: #5b2c8b;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .close-btn {
      color: #5f6368;
    }

    .close-btn:hover {
      background: #f1f3f4;
    }

    mat-dialog-content {
      padding: 24px !important;
      max-height: 70vh;
      overflow-y: auto;
    }

    .member-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-field {
      width: 100%;
    }

    ::ng-deep .mat-mdc-form-field-icon-prefix {
      padding-left: 12px;
      color: #5f6368;
    }

    ::ng-deep .mat-mdc-text-field-wrapper {
      background: white;
    }

    ::ng-deep .mat-mdc-form-field-focus-overlay {
      background: transparent;
    }

    ::ng-deep .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
    ::ng-deep .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
    ::ng-deep .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
      border-color: #dadce0;
    }

    ::ng-deep .mdc-text-field--outlined:not(.mdc-text-field--disabled):hover .mdc-notched-outline__leading,
    ::ng-deep .mdc-text-field--outlined:not(.mdc-text-field--disabled):hover .mdc-notched-outline__notch,
    ::ng-deep .mdc-text-field--outlined:not(.mdc-text-field--disabled):hover .mdc-notched-outline__trailing {
      border-color: #5b2c8b;
    }

    ::ng-deep .mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
    ::ng-deep .mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
    ::ng-deep .mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
      border-color: #5b2c8b !important;
      border-width: 2px !important;
    }

    ::ng-deep .mat-mdc-form-field.mat-focused .mat-mdc-form-field-icon-prefix {
      color: #5b2c8b;
    }

    mat-dialog-actions {
      padding: 16px 24px;
      margin: 0 -24px -24px -24px;
      border-top: 1px solid #e8eaed;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .cancel-btn {
      color: #5f6368;
    }

    .cancel-btn:hover {
      background: #f1f3f4;
    }

    .save-btn {
      background: #5b2c8b;
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .save-btn:hover:not(:disabled) {
      background: #3d1d5c;
    }

    .save-btn:disabled {
      background: #dadce0;
      color: #80868b;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule
    ],
    standalone: true
})
export class MemberDialogComponent {
    memberForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<MemberDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Member | null
    ) {
        this.memberForm = this.fb.group({
            firstName: [data?.firstName || '', Validators.required],
            lastName: [data?.lastName || '', Validators.required],
            email: [data?.email || '', [Validators.required, Validators.email]],
            phone: [data?.phone || '', Validators.required],
            city: [data?.city || '', Validators.required],
            age: [data?.age || '', Validators.required],
            specialization: [data?.specialization || '', Validators.required],
            experience: [data?.experience || '', Validators.required],
            status: [data?.status || 'available', Validators.required],
            rating: [data?.rating || 0, [Validators.required, Validators.min(0), Validators.max(5)]]
        });
    }

    onSave() {
        if (this.memberForm.valid) {
            this.dialogRef.close(this.memberForm.value);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }
}
