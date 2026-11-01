---
name: Aether Glass
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#ffb0cd'
  on-tertiary: '#640039'
  tertiary-container: '#f751a1'
  on-tertiary-container: '#570032'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies an ultra-luxurious, futuristic acrylic aesthetic. It merges the optical precision of macOS/iOS glassmorphism with high-end, gallery-tier minimalism. Designed for high-frequency trading dashboards, executive spatial interfaces, and next-generation analytical suites, the visual language establishes optical depth through translucent layering rather than flat opacity.

The interface should feel physical yet weightless—like precision-milled sapphire crystal suspended over an ambient, luminous chromatic void. Micro-textures, high-radius backdrop diffusion, crisp specular hair-lines, and inner rim-lighting give elements a tangible, luminous presence without sacrificing clarity or data density.

## Colors

The palette operates on a deep atmospheric canvas (`#090D16` transitioning into obsidian-indigo shadows), accented by ethereal, chromatic energy blooms.

- **Primary (`#6366F1`)**: Electric Indigo. Acts as the core luminescent beacon for states, key micro-interactions, and active selections.
- **Secondary (`#38BDF8`)**: Radiant Cyan. Provides optical contrast and highlights data flows, live metrics, and high-frequency indicators.
- **Tertiary (`#EC4899`)**: Luminous Orchid. Used sparingly for critical alerts, expressive analytics, and secondary gradient sweeps.
- **Neutral Canvas (`#090D16`)**: Deep Cosmic Obsidian. Creates the optical baseline required for translucent white and frosted refractions to stand out crisply.

### Surface Color Scales & Translucency
- **Base Ambient Mesh**: Subtle, slow-shifting radial gradients of primary and secondary at 12–20% opacity beneath frosted cards.
- **Glass Panel Surface**: `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.07)`.
- **Raised Glass Surface**: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`.
- **Glass Specular Border**: `rgba(255, 255, 255, 0.18)` at upper light source points, tapering down to `rgba(255, 255, 255, 0.06)` along shadow edges.

## Typography

Typography prioritizes high optical contrast against multi-layered frosted backdrops.

- **Primary Headings & Body (Plus Jakarta Sans)**: Delivers geometric clarity and warm, modern counters. High weights (600, 700) maintain legibility over variable luminescence. Body copy uses pure white (`#FFFFFF`) for primary titles and high-alpha silver (`rgba(255, 255, 255, 0.72)`) for running text to prevent background bleed-through.
- **Technical & Metric Readouts (JetBrains Mono)**: Used for data tables, metrics, status badges, timestamps, and system readouts. Monospaced tabular figures ensure stable, flicker-free dashboard updates.

## Layout & Spacing

The layout uses a 12-column fluid grid on desktop and tablet, collapsing to a single-column or 2-column stacked layout on mobile.

- **Desktop (1200px+)**: 12 columns with 24px (`1.5rem`) gutters and 32px (`2rem`) outer canvas margins. Ample negative space allows background refractions and frosted ambient glows to separate visual clusters.
- **Tablet (768px – 1199px)**: 8 columns with 16px (`1rem`) gutters and 24px (`1.5rem`) canvas margins. Sidebars collapse to icon docks or translucent bottom sheets.
- **Mobile (< 768px)**: 4 columns or single-column stack with 12px (`0.75rem`) gutters and 16px (`1rem`) canvas margins. Cards take full container width; blur intensity is optimized to preserve mobile rendering performance.

## Elevation & Depth

Depth is defined by optical material physics rather than opaque drop shadows:

1. **Diffusion (Backdrop Blur)**:
   - Base Floating Panels: `backdrop-filter: blur(24px) saturate(180%)`.
   - Modals, Popovers, Flyouts: `backdrop-filter: blur(40px) saturate(200%)`.
   - Micro-controls / Pills: `backdrop-filter: blur(16px) saturate(160%)`.

2. **Specular Outlines & Highlights**:
   - Every translucent card utilizes a linear-gradient border: top-left `rgba(255, 255, 255, 0.22)` descending to bottom-right `rgba(255, 255, 255, 0.04)`.
   - Top-edge specular inner-glow: `box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)`.

3. **Ambient Color Illumination**:
   - Floating elements cast soft, tinted shadows: `0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 30px -5px rgba(99, 102, 241, 0.12)`.
   - Active or focused items emit an outward chromatic aura: `0 0 24px 0 rgba(56, 189, 248, 0.35)`.

## Shapes

The design system uses level-2 roundedness with a pronounced hierarchy:

- **Cards & Primary Modules**: `rounded-2xl` (1.5rem / 24px) to emphasize the smooth, cast-acrylic tactile feel.
- **Buttons, Badges, Tabs, and Inputs**: Strict pill geometry (`rounded-full` / 9999px) or refined soft capsules (`rounded-xl` / 16px).
- **Tooltips & Flyouts**: `rounded-lg` (12px).
- **Concentric Nesting Rule**: Internal items always have an outer border radius minus the internal padding to ensure optical alignment of curves.

## Components

### Buttons
- **Primary Acrylic Button**: Pill-shaped (`rounded-full`). Gradient fill from `rgba(99, 102, 241, 0.85)` to `rgba(56, 189, 248, 0.85)` with a 1px border of `rgba(255, 255, 255, 0.3)`. Text is pure white bold. Hover state expands a 16px soft outer glow.
- **Frosted Secondary Button**: Pill-shaped. Background `rgba(255, 255, 255, 0.06)`, `backdrop-filter: blur(16px)`, border `rgba(255, 255, 255, 0.15)`. Text is `#FFFFFF`. On hover, background elevates to `rgba(255, 255, 255, 0.12)`.

### Chips & Filter Pills
- Compact capsules (`rounded-full`, height: 28px).
- Inactive: Background `rgba(255, 255, 255, 0.04)`, border `rgba(255, 255, 255, 0.1)`. Monospaced text in `rgba(255, 255, 255, 0.7)`.
- Active: Background `rgba(99, 102, 241, 0.25)`, border `rgba(99, 102, 241, 0.6)`, active cyan status dot with a pulsating glow.

### Cards & Metric Panels
- Base background: `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)`.
- Blur: `backdrop-filter: blur(28px)`.
- Perimeter: 1px border `rgba(255, 255, 255, 0.12)`.
- Inner highlight: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`.

### Input Fields
- Enclosed frosted track (`rounded-xl`, height: 44px).
- Background: `rgba(0, 0, 0, 0.25)`, backdrop blur `12px`.
- Border: `1px solid rgba(255, 255, 255, 0.12)`.
- Focus state: Border transitions to `rgba(56, 189, 248, 0.6)` with an ambient outer glow `0 0 12px rgba(56, 189, 248, 0.25)`.

### Checkboxes & Radios
- Checkboxes: 20px rounded squares (`rounded-md`), frosted dark background with 1px `rgba(255, 255, 255, 0.2)` border. Checked state transitions to saturated indigo fill with an inner white check glyph.
- Radio buttons: 20px concentric circles (`rounded-full`), active state displays an inner glowing pill dot (`#38BDF8`).

### Translucent Segmented Controls
- Continuous frosted capsule pill with a sliding acrylic indicator (`rgba(255, 255, 255, 0.15)`) featuring an inner specular line and sharp drop-shadow over the inactive tracks.