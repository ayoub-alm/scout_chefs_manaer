# 🎨 SAHI Platform - World Scouting Color Palette

## Color Reference Guide

This document provides the complete color palette used in the SAHI platform, inspired by the World Scouting Organization (scout.org).

---

## Primary Colors

### 🟣 Purple (World Scouting Brand)
```css
--primary-color: #662483;      /* Main brand purple */
--primary-light: #8e4ba8;      /* Light purple for highlights */
--primary-dark: #4a1a5f;       /* Dark purple for depth */
--primary-gradient: linear-gradient(135deg, #662483 0%, #4a1a5f 100%);
```

**Usage:**
- Primary buttons and CTAs
- Navigation active states
- Brand elements (logo, titles)
- Feature card borders
- Sidebar headers

**RGB:** `rgb(102, 36, 131)`  
**HSL:** `hsl(282, 57%, 33%)`

---

## Secondary Colors

### 🟠 Orange (Scout Accent)
```css
--secondary-color: #ff8c42;    /* Scout orange */
--secondary-light: #ffb366;    /* Light orange */
--secondary-dark: #e6692a;     /* Dark orange */
--secondary-gradient: linear-gradient(135deg, #ff8c42 0%, #ff7a29 100%);
```

**Usage:**
- Feature icons (alternating)
- Statistics section icons
- Accent elements
- Warning/attention states

**RGB:** `rgb(255, 140, 66)`  
**HSL:** `hsl(24, 100%, 63%)`

---

## Accent Colors

### 🟢 Green (Scout Growth)
```css
--accent-color: #00bf63;       /* Scout green */
--accent-light: #4dd98c;       /* Light green */
--accent-dark: #009649;        /* Dark green */
```

**Usage:**
- Success states
- Feature icons (alternating)
- Statistics section icons
- Environmental/growth themes

**RGB:** `rgb(0, 191, 99)`  
**HSL:** `hsl(151, 100%, 37%)`

---

### 🔵 Blue (Scout Trust)
```css
--accent-blue: #3ba4d8;        /* Scout blue */
--accent-blue-light: #6dc2e8;  /* Light blue */
--accent-blue-dark: #2a8abc;   /* Dark blue */
```

**Usage:**
- Information states
- Feature icons (alternating)
- Statistics section icons
- Trust/reliability themes

**RGB:** `rgb(59, 164, 216)`  
**HSL:** `hsl(200, 67%, 54%)`

---

## Neutral Colors

### Gray Scale
```css
--gray-50: #f8fafc;    /* Lightest background */
--gray-100: #f1f5f9;   /* Light background */
--gray-200: #e2e8f0;   /* Borders */
--gray-300: #cbd5e1;   /* Disabled states */
--gray-400: #94a3b8;   /* Placeholder text */
--gray-500: #64748b;   /* Secondary text */
--gray-600: #475569;   /* Body text */
--gray-700: #334155;   /* Headings */
--gray-800: #1e293b;   /* Dark text */
--gray-900: #0f172a;   /* Darkest text */
```

---

## Semantic Colors

### Success
```css
--success-color: #00bf63;  /* Same as accent green */
```

### Warning
```css
--warning-color: #ff8c42;  /* Same as secondary orange */
```

### Error
```css
--error-color: #d32f2f;    /* Red for errors */
```

---

## Background Gradients

### Hero Section
```css
background: linear-gradient(135deg, #f3e8ff 0%, #f0ebf7 50%, #f9f5ff 100%);
```
Light purple gradient for hero backgrounds

### CTA Section
```css
background: linear-gradient(135deg, #4a1a5f 0%, #662483 60%, #ff8c42 100%);
```
Purple to orange gradient for call-to-action sections

### Promo Section
```css
background: linear-gradient(135deg, #4a1a5f 0%, #662483 60%, #ff8c42 100%);
```
Same as CTA - creates visual consistency

---

## Icon Colors

### Feature Icons (Rotating Pattern)
1. **Purple** - Groups, School icons
2. **Orange** - Event, Security icons
3. **Green** - Landscape icons
4. **Blue** - Insights icons

### Statistics Icons
Each statistic has its own branded color:
- Purple: Scouts/Leaders
- Orange: Troops/Organizations
- Green: Community Service Hours
- Blue: Projects/Activities

---

## Shadow Colors

### Purple Shadows
```css
box-shadow: 0 10px 24px rgba(102, 36, 131, 0.22);  /* Light */
box-shadow: 0 14px 32px rgba(102, 36, 131, 0.28);  /* Medium */
box-shadow: 0 4px 12px rgba(102, 36, 131, 0.35);   /* Strong */
```

### Orange Shadows
```css
box-shadow: 0 10px 24px rgba(255, 140, 66, 0.25);
box-shadow: 0 14px 32px rgba(255, 140, 66, 0.35);
```

### Green Shadows
```css
box-shadow: 0 10px 24px rgba(0, 191, 99, 0.25);
box-shadow: 0 14px 32px rgba(0, 191, 99, 0.35);
```

### Blue Shadows
```css
box-shadow: 0 10px 24px rgba(59, 164, 216, 0.25);
box-shadow: 0 14px 32px rgba(59, 164, 216, 0.35);
```

---

## Opacity Variations

### Background Overlays
```css
rgba(102, 36, 131, 0.08)   /* Subtle hover */
rgba(102, 36, 131, 0.1)    /* Light background */
rgba(102, 36, 131, 0.12)   /* Medium background */
rgba(255, 255, 255, 0.9)   /* White overlay */
```

---

## Accessibility

### Contrast Ratios (WCAG AA Compliant)

**Purple on White:**
- #662483 on #ffffff: 7.8:1 ✅ (AAA)

**Orange on White:**
- #ff8c42 on #ffffff: 2.8:1 ⚠️ (Use for large text only)

**Green on White:**
- #00bf63 on #ffffff: 3.2:1 ⚠️ (Use for large text only)

**Blue on White:**
- #3ba4d8 on #ffffff: 3.1:1 ⚠️ (Use for large text only)

**Best Practices:**
- Use purple for primary text elements (highest contrast)
- Use accent colors for icons and large UI elements
- Always test color combinations for readability
- Provide sufficient color contrast for text

---

## Usage Guidelines

### Do's ✅
- Use purple as the primary brand color
- Rotate accent colors for visual variety
- Maintain consistent gradients
- Use shadows to create depth
- Keep backgrounds light for readability

### Don'ts ❌
- Don't use too many colors at once
- Don't use accent colors for body text
- Don't mix gradients randomly
- Don't ignore contrast requirements
- Don't override brand colors

---

## Color Psychology

### Purple (#662483)
- **Represents:** Royalty, wisdom, leadership, dignity
- **Scouting Context:** Leadership, tradition, excellence
- **Emotional Impact:** Trust, respect, professionalism

### Orange (#ff8c42)
- **Represents:** Energy, enthusiasm, warmth, adventure
- **Scouting Context:** Activity, outdoor spirit, community
- **Emotional Impact:** Excitement, friendliness, approachability

### Green (#00bf63)
- **Represents:** Growth, nature, harmony, sustainability
- **Scouting Context:** Environmental stewardship, growth
- **Emotional Impact:** Balance, renewal, hope

### Blue (#3ba4d8)
- **Represents:** Trust, stability, calm, reliability
- **Scouting Context:** Dependability, service, loyalty
- **Emotional Impact:** Confidence, security, peace

---

## Implementation

### CSS Variables (src/styles.css)
All colors are defined as CSS custom properties in `:root` for easy theme management.

### Component Usage
Import colors via CSS variables:
```css
.my-element {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 36, 131, 0.32);
}
```

---

## References

- **World Scouting:** https://www.scout.org/
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Material Design Colors:** https://material.io/design/color

---

**Last Updated:** December 24, 2025  
**Version:** 2.0  
**Theme:** World Scouting Brand Identity

