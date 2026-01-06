import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent {
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);

  leaderForm!: FormGroup;
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  scoutRoles = [
    { label: 'رئيس فوج', value: 'TROOP_LEADER' },
    { label: 'قائد فرقة', value: 'UNIT_LEADER' },
    { label: 'مساعد قائد', value: 'ASSISTANT_LEADER' },
    { label: 'منسق مخيمات', value: 'CAMP_COORDINATOR' },
    { label: 'مسؤول تدريب', value: 'TRAINING_OFFICER' },
    { label: 'قائد أشبال', value: 'CUBS_LEADER' },
    { label: 'قائدة زهرات', value: 'BLOSSOMS_LEADER' },
    { label: 'قائد جوالة', value: 'ROVERS_LEADER' },
    { label: 'آخر', value: 'OTHER' }
  ];

  availabilityOptions = [
    { label: 'متاح', value: 'AVAILABLE' },
    { label: 'غير متاح', value: 'NOT_AVAILABLE' },
    { label: 'متاح جزئياً', value: 'PARTIALLY_AVAILABLE' }
  ];

  moroccanCities = [
    'الدار البيضاء', 'الرباط', 'فاس', 'مراكش', 'طنجة', 'أكادير',
    'مكناس', 'وجدة', 'القنيطرة', 'تطوان', 'الجديدة', 'بني ملال'
  ];

  moroccanRegions = [
    { label: 'طنجة تطوان الحسيمة', value: 'TANGER_TETOUAN_AL_HOCEIMA' },
    { label: 'الشرق', value: 'ORIENTAL' },
    { label: 'فاس مكناس', value: 'FES_MEKNES' },
    { label: 'الرباط سلا القنيطرة', value: 'RABAT_SALE_KENITRA' },
    { label: 'بني ملال خنيفرة', value: 'BENI_MELLAL_KHENIFRA' },
    { label: 'الدار البيضاء سطات', value: 'CASABLANCA_SETTAT' },
    { label: 'مراكش آسفي', value: 'MARRAKECH_SAFI' },
    { label: 'درعة تافيلالت', value: 'DRAA_TAFILALET' },
    { label: 'سوس ماسة', value: 'SOUSS_MASSA' },
    { label: 'كلميم واد نون', value: 'GUELMIM_OUED_NOUN' },
    { label: 'العيون الساقية الحمراء', value: 'LAAYOUNE_SAKIA_EL_HAMRA' },
    { label: 'الداخلة وادي الذهب', value: 'DAKHLA_OUED_ED_DAHAB' },
  ];

  constructor() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.leaderForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      region: ['', [Validators.required]],
      yearsOfExperience: ['', [Validators.required, Validators.min(0)]],
      primaryRole: ['', [Validators.required]],
      secondaryRoles: [''],
      currentOrganization: [''],
      scoutGroup: [''],
      availabilityStatus: ['AVAILABLE', [Validators.required]],
      certifications: [''],
      notes: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.leaderForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmitLeader(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.leaderForm.invalid) {
      this.errorMessage.set('الرجاء ملء جميع الحقول المطلوبة بشكل صحيح');
      return;
    }

    this.isSubmitting.set(true);

    const formData = this.leaderForm.value;

    // Register user as MEMBER with region & city
    this.apiService.register(
      formData.email,
      formData.password || 'Temp@123', // optional if not present
      `${formData.firstName} ${formData.lastName}`,
      formData.city,
      formData.region,
      'MEMBER'
    ).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.successMessage.set('✓ تم إرسال ملفك الشخصي بنجاح! سيقوم فريقنا بمراجعته قريباً.');
        this.leaderForm.reset({
          availabilityStatus: 'AVAILABLE',
          region: '',
          city: ''
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage.set('');
        }, 5000);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error('Error submitting leader profile:', err);
        this.errorMessage.set(
          err.error?.message || 'فشل إرسال الملف الشخصي. يرجى المحاولة مرة أخرى.'
        );
      }
    });
  }
}
