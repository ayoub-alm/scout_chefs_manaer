import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

interface ScoutLeader {
  name: string;
  role: string;
  rating: number;
  yearsExp: number;
  region: string;
}

interface Testimonial {
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  standalone: true
})
export class HomeComponent {
  @ViewChild('featured') featuredSection!: ElementRef;
  @ViewChild('hero') heroSection!: ElementRef;
  @ViewChild('features') featuresSection!: ElementRef;
  @ViewChild('promo') promoSection!: ElementRef;

  email = '';

  featuredLeaders: ScoutLeader[] = [
    {
      name: 'أحمد المرابط',
      role: 'رئيس فرقة الجوالة',
      rating: 4.9,
      yearsExp: 15,
      region: 'الدار البيضاء'
    },
    {
      name: 'فاطمة الزهراء',
      role: 'قائدة الأشبال والزهرات',
      rating: 4.8,
      yearsExp: 10,
      region: 'الرباط'
    },
    {
      name: 'يوسف بنعلي',
      role: 'منسق المخيمات الكشفية',
      rating: 4.9,
      yearsExp: 12,
      region: 'مراكش'
    },
    {
      name: 'خديجة السعدي',
      role: 'مسؤولة التكوين والتدريب',
      rating: 4.7,
      yearsExp: 8,
      region: 'فاس'
    },
    {
      name: 'عمر الفاسي',
      role: 'رئيس الفوج الكشفي',
      rating: 4.9,
      yearsExp: 14,
      region: 'طنجة'
    },
    {
      name: 'سلمى الإدريسي',
      role: 'قائدة الكشافة المتقدمة',
      rating: 4.8,
      yearsExp: 9,
      region: 'أكادير'
    }
  ];

  worldStats = [
    { value: '18,000', label: 'منخرط', icon: 'groups', color: '#662483' },
    { value: '4,500', label: 'راشد متطوع', icon: 'volunteer_activism', color: '#ff8c42' },
    { value: '128', label: 'مقاطعة', icon: 'map', color: '#00bf63' },
    { value: '16', label: 'جهة بالمملكة', icon: 'public', color: '#3ba4d8' }
  ];

  commitments = [
    {
      icon: 'verified',
      title: 'ضمان الجودة والاستمرارية',
      description: 'ضمان جودة، استمرارية، حضور ونمو الحركة الكشفية في جميع أنحاء المملكة المغربية.'
    },
    {
      icon: 'track_changes',
      title: 'تحديد التوجهات والأهداف',
      description: 'تحديد التوجهات، الأهداف، الوسائل، السياسات والبرامج لتلبية احتياجات الأعضاء وإعداد خطة التطوير الاستراتيجية بالتشاور.'
    },
    {
      icon: 'analytics',
      title: 'التخطيط الاستراتيجي',
      description: 'تطوير وتنشيط عملية التخطيط الاستراتيجي، إنجاز الأبحاث والتحليلات والسيناريوهات المستقبلية.'
    },
    {
      icon: 'handshake',
      title: 'المساهمة في التنمية',
      description: 'المساهمة بأعمال التنمية الاجتماعية والتربوية لصالح المجتمعات المحلية كوسيلة لتعزيز التربية على التنمية والسلام وحس المسؤولية.'
    }
  ];

  promoStats = [
    { value: '500+', label: 'قائد كشفي نشط', icon: 'groups' },
    { value: '1000+', label: 'اجتماع منظم', icon: 'event' },
    { value: '50+', label: 'مدينة مغربية', icon: 'public' },
    { value: '4.9', label: 'تقييم متوسط', icon: 'star' }
  ];

  howItWorksSteps: Step[] = [
    {
      number: 1,
      title: 'إنشاء حساب',
      description: 'سجل كقائد كشفي أو مسؤول فوج في دقائق معدودة',
      icon: 'person_add'
    },
    {
      number: 2,
      title: 'إعداد الملف الشخصي',
      description: 'أضف معلوماتك الكشفية، خبراتك، وشهاداتك',
      icon: 'card_membership'
    },
    {
      number: 3,
      title: 'جدولة الاجتماعات',
      description: 'نظم اجتماعاتك وأنشطتك الكشفية بسهولة',
      icon: 'calendar_month'
    },
    {
      number: 4,
      title: 'إدارة الفريق',
      description: 'تابع أعضاء فريقك وأنشطتهم وإنجازاتهم',
      icon: 'dashboard'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'محمد الحسني',
      role: 'قائد كشفي - الرباط',
      message: 'منظمة الكشاف المغربي علمتني معنى الانضباط والمسؤولية. التكوين الذي تلقيته ساعدني في حياتي المهنية والشخصية.',
      rating: 5,
      avatar: 'م ح'
    },
    {
      name: 'سعاد التازي',
      role: 'قائدة الزهرات - فاس',
      message: 'الأنشطة التربوية والمخيمات الكشفية أثرت إيجابيا على شخصية بناتي. المنظمة توفر بيئة آمنة ومحفزة.',
      rating: 5,
      avatar: 'س ت'
    },
    {
      name: 'كريم الوردي',
      role: 'منسق المخيمات - مراكش',
      message: 'الحركة الكشفية علمتني قيم التعاون والتضامن وخدمة المجتمع. فخور بانتمائي للمنظمة.',
      rating: 5,
      avatar: 'ك و'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'ما هي منظمة الكشاف المغربي؟',
      answer: 'منظمة الكشاف المغربي هي حركة شبابية تربوية تأسست سنة 1969، تهدف إلى تكوين الفتيات والفتيان على المستوى الجسدي، الفكري، الاجتماعي والروحي وفق مبادئ الحركة الكشفية العالمية.'
    },
    {
      question: 'كيف يمكنني الانضمام للمنظمة؟',
      answer: 'يمكنك الانضمام من خلال التواصل مع أقرب مقاطعة أو فوج كشفي في منطقتك، أو عبر التسجيل في المنصة الرقمية SAHI. تضم المنظمة 128 مقاطعة موزعة على 16 جهة بالمملكة.'
    },
    {
      question: 'ما هي الفئات العمرية المستهدفة؟',
      answer: 'المنظمة تستقبل الفتيات والفتيان من مختلف الأعمار ضمن مراحل متعددة: الأشبال والزهرات، الكشافة والمرشدات، الكشاف المتقدم والمرشدة المتقدمة، والجوالة والدليلات.'
    },
    {
      question: 'ما هي تكلفة الانخراط؟',
      answer: 'تكلفة الانخراط رمزية وتختلف حسب المقاطعة والجهة. المنظمة تعتمد على المتطوعين وتسعى لجعل الكشفية في متناول الجميع.'
    },
    {
      question: 'ما هي الأنشطة التي تنظمها المنظمة؟',
      answer: 'تنظم المنظمة مخيمات كشفية، أنشطة في الطبيعة، مشاريع خدمة المجتمع، دورات تكوينية، لقاءات وطنية ودولية، وأنشطة ثقافية ورياضية متنوعة.'
    },
    {
      question: 'هل المنظمة معترف بها رسميا؟',
      answer: 'نعم، حصلت المنظمة على الاعتراف الرسمي من السلطات المغربية سنة 1970، وهي عضو في الاتحاد الوطني للكشفية المغربية، المنظمة الكشفية العربية والمنظمة العالمية للحركة الكشفية.'
    },
    {
      question: 'ما هي منصة SAHI؟',
      answer: 'SAHI هي المنصة الرقمية لمنظمة الكشاف المغربي، تساعد القادة والمسؤولين على إدارة الأنشطة، جدولة الاجتماعات، متابعة الأعضاء وتنظيم الفعاليات بشكل احترافي وسهل.'
    }
  ];

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  scrollToSection(sectionId: string): void {
    const element = this.featuredSection?.nativeElement;
    if (element && sectionId === 'featured') {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  subscribeNewsletter(): void {
    if (this.email) {
      console.log('Newsletter subscription:', this.email);
      // TODO: Implement newsletter subscription
      alert('شكراً لاشتراكك! سنرسل لك آخر الأخبار والتحديثات.');
      this.email = '';
    }
  }
}