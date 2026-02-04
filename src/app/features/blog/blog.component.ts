import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface BlogPost {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    tag: string;
    imageUrl: string;
}

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
    blogPosts: BlogPost[] = [
        {
            title: 'أفضل الممارسات لتنظيم مخيم كشفي ناجح',
            excerpt: 'خطوات عملية لإعداد مخيم كشفي آمن وممتع مع قائمة تدقيق جاهزة للاستخدام من قبل قادة الفرق.',
            author: 'أحمد المرابط',
            date: '12 يناير 2025',
            readTime: '6 دقائق',
            tag: 'إدارة الأنشطة',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        },
        {
            title: 'كيفية بناء فريق كشفي متماسك',
            excerpt: 'نصائح لبناء ثقافة ثقة وتعاون بين أفراد الفريق مع أفكار لأنشطة تعزز روح الفريق.',
            author: 'سلمى الإدريسي',
            date: '5 يناير 2025',
            readTime: '4 دقائق',
            tag: 'القيادة',
            imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        },
        {
            title: 'أدوات رقمية تساعد القادة في المتابعة اليومية',
            excerpt: 'تعرف على أهم الأدوات الرقمية لإدارة الاجتماعات والمهام والتواصل مع أولياء الأمور بسرعة.',
            author: 'يوسف بنعلي',
            date: '28 دجنبر 2024',
            readTime: '5 دقائق',
            tag: 'التحول الرقمي',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
        },
        {
            title: 'خطط طوارئ للمخيمات الكشفية',
            excerpt: 'كيفية إعداد خطط بديلة وحزم إسعافات ومهام واضحة للفريق عند وقوع الطوارئ.',
            author: 'خديجة السعدي',
            date: '20 دجنبر 2024',
            readTime: '7 دقائق',
            tag: 'السلامة',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        },
        {
            title: 'تنشيط الأنشطة الليلية بأمان',
            excerpt: 'أفكار لأنشطة ليلية ممتعة مع إرشادات للسلامة والإشراف ومشاركة الجميع.',
            author: 'عمر الفاسي',
            date: '10 دجنبر 2024',
            readTime: '5 دقائق',
            tag: 'الأنشطة',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        },
        {
            title: 'دور الكشافة في خدمة المجتمع',
            excerpt: 'كيف يمكن للأنشطة الكشفية أن تساهم في تنمية المجتمع المحلي وتعزيز قيم التطوع.',
            author: 'فاطمة الزهراء',
            date: '3 دجنبر 2024',
            readTime: '6 دقائق',
            tag: 'خدمة المجتمع',
            imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80'
        }
    ];

    getInitials(name: string): string {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    }
}
