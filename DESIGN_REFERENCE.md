# Quick Design System Reference

## 🎨 Color Palette

### Primary Purple
```
#7c3aed - Main purple (buttons, links, accents)
#a78bfa - Light purple (hover states, backgrounds)
#5b21b6 - Dark purple (gradients, shadows)
#ddd6fe - Ultra light (subtle backgrounds)
```

### Secondary Purple
```
#9333ea - Secondary purple
#c084fc - Light variant
#6b21a8 - Dark variant
```

### Accent Pink
```
#ec4899 - Accent color
#f9a8d4 - Light accent
#be185d - Dark accent
```

## 🔮 Glassmorphism Classes

### Basic Usage
```html
<div class="glass">
  <!-- Semi-transparent with blur -->
</div>

<div class="glass-strong">
  <!-- More opaque with stronger blur -->
</div>

<div class="glass-dark">
  <!-- Dark variant -->
</div>
```

### CSS Properties
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.18);
box-shadow: 0 8px 32px rgba(124, 58, 237, 0.15);
```

## 🎭 Neomorphism Classes

### Basic Usage
```html
<div class="neo">
  <!-- Soft extruded effect -->
</div>

<div class="neo-inset">
  <!-- Pressed/inset effect -->
</div>

<div class="neo-flat">
  <!-- Flat neomorphic style -->
</div>
```

### CSS Properties
```css
background: #e8ecf4;
box-shadow: 8px 8px 20px rgba(124, 58, 237, 0.08),
            -4px -4px 16px rgba(255, 255, 255, 0.9);
border-radius: 16px;
```

## 📐 Spacing Scale
```
0.25rem = 4px
0.5rem  = 8px
0.75rem = 12px
1rem    = 16px
1.25rem = 20px
1.5rem  = 24px
2rem    = 32px
3rem    = 48px
4rem    = 64px
```

## 🔤 Typography Scale
```css
h1: clamp(2rem, 5vw, 3.5rem)      /* 32px - 56px */
h2: clamp(1.75rem, 4vw, 2.5rem)   /* 28px - 40px */
h3: clamp(1.5rem, 3vw, 2rem)      /* 24px - 32px */
h4: clamp(1.25rem, 2.5vw, 1.5rem) /* 20px - 24px */
p:  1rem (16px) with line-height 1.7
```

## 🎬 Animation Classes
```html
<div class="animate-fadeIn">Fades in</div>
<div class="animate-fadeInUp">Fades in from bottom</div>
<div class="animate-slideInRight">Slides from left</div>
<div class="animate-float">Floating animation</div>
<div class="animate-pulse">Pulsing effect</div>
```

## 📱 Responsive Breakpoints
```css
/* Small mobile */
@media (max-width: 480px) { }

/* Mobile/Tablet */
@media (max-width: 768px) { }

/* Desktop switch */
@media (max-width: 900px) { }

/* Large tablet */
@media (max-width: 1024px) { }

/* Max content width */
max-width: 1400px
```

## 🎯 Common Patterns

### Glassmorphic Card
```html
<div style="
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(124, 58, 237, 0.1);
  box-shadow: 0 8px 32px rgba(124, 58, 237, 0.15);
">
  Content here
</div>
```

### Neomorphic Button
```html
<button style="
  background: #e8ecf4;
  box-shadow: 8px 8px 16px rgba(124, 58, 237, 0.1),
              -8px -8px 16px rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  padding: 0.875rem 1.75rem;
  border: none;
  font-weight: 700;
  transition: all 0.3s ease;
">
  Click Me
</button>
```

### Purple Gradient Button
```html
<button style="
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
  color: white;
  border-radius: 50px;
  padding: 0.875rem 1.75rem;
  border: none;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
  transition: all 0.3s ease;
">
  Primary Action
</button>
```

## 🎨 Gradient Utilities
```css
.gradient-primary {
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
}

.gradient-secondary {
  background: linear-gradient(135deg, #9333ea 0%, #6b21a8 100%);
}

.gradient-vibrant {
  background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #5b21b6 100%);
}
```

## 🔄 Transition Timing
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

## 📦 Border Radius Scale
```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-3xl: 2rem;      /* 32px */
--radius-full: 9999px;   /* Fully rounded */
```

## 💡 Best Practices

### DO ✅
- Use CSS variables for colors
- Apply backdrop-filter for glassmorphism
- Use clamp() for responsive typography
- Add hover states to interactive elements
- Test on mobile devices
- Maintain color contrast for accessibility
- Use transform for animations

### DON'T ❌
- Overuse glassmorphism (can reduce readability)
- Stack too many glass layers
- Use fixed pixel values for responsive elements
- Forget webkit prefixes for Safari
- Ignore keyboard navigation
- Use animations on low-end devices without consideration
- Mix too many design styles

## 🚀 Quick Start Example
```html
<div class="neo" style="padding: 2rem; margin: 1rem;">
  <h2 class="text-primary">Purple Heading</h2>
  <p>Some content with neomorphic design</p>
  <button class="gradient-primary" style="
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    border: none;
    color: white;
    font-weight: 700;
    cursor: pointer;
  ">
    Action Button
  </button>
</div>
```

## 📚 Resources
- Material Design 3 Guidelines
- Glassmorphism.com
- CSS Tricks - Neomorphism
- MDN Web Docs - Backdrop Filter
- Can I Use - Browser Compatibility
