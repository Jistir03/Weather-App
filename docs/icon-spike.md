# Animated Icon Library Spike — Architectural Decision Record

**Date:** 2026-03-21
**Story:** 1.2
**Decision:** Custom SVG + Tailwind CSS animations

---

## Decision

**Chosen approach: Custom SVG icons with Tailwind CSS animation utilities**

No third-party icon library is installed. All 8 weather condition icons are implemented as typed React SVG components with Tailwind `motion-safe:animate-*` utilities for animation.

---

## Evaluation Summary

Libraries were evaluated in the mandatory order (ARCH2):

### Option 1: `react-animated-weather` v4.0.1

| Criterion | Result |
|---|---|
| Bundle delta | +3.86 KB gzip (63.83 KB total) |
| TypeScript types | **None** — no built-in, no `@types/react-animated-weather` on npm |
| Condition coverage | 8/9 Skycon conditions — **missing THUNDERSTORM** |
| `prefers-reduced-motion` | Manual via `animate={false}` prop |
| Rendering | Canvas (not SVG) — less flexible for theming |

**Verdict: Rejected.** No TypeScript types violates FR28 (zero `any` types). Missing storm condition violates UX-DR1. Would require manual `.d.ts` declaration and `@ts-expect-error` suppressions throughout the codebase.

---

### Option 2: Custom SVG + Tailwind CSS (Chosen)

| Criterion | Result |
|---|---|
| Bundle delta | +0.33 KB gzip (60.30 KB total — essentially zero overhead) |
| TypeScript types | Full — React SVG components are natively typed |
| Condition coverage | All 8 conditions (built to spec) |
| `prefers-reduced-motion` | Native via Tailwind `motion-safe:animate-*` variants |
| Rendering | SVG — scalable, color-themeable via CSS variables |

**Verdict: Chosen.**

---

### Option 3: Lottie

Not evaluated — Option 2 meets all criteria. Lottie would add significant bundle overhead (~40–80 KB) and require Lottie JSON assets.

---

## Bundle Size Impact

| State | JS (raw) | JS (gzip) |
|---|---|---|
| Baseline (Story 1.1) | 190.44 KB | 59.97 KB |
| With react-animated-weather | 200.91 KB | 63.83 KB |
| Custom SVG (chosen) | 191.03 KB | 60.30 KB gzip |
| **Budget** | — | **250 KB gzip** |

Custom SVG approach leaves ~190 KB gzip headroom for app code.

---

## Condition Mapping

| Weather Condition | Component Name | Animation |
|---|---|---|
| clear (day) | `ClearDayIcon` | Rays rotate slowly (`motion-safe:animate-spin`, 8s) |
| clear (night) | `ClearNightIcon` | Subtle pulse on moon (`motion-safe:animate-pulse`) |
| partly cloudy | `PartlyCloudyIcon` | Cloud drifts left-right (custom `translateX` keyframe via `motion-safe:`) |
| cloudy/overcast | `CloudyIcon` | Static or slow drift |
| rain/drizzle | `RainIcon` | Raindrops fall (custom `translateY` keyframe via `motion-safe:`) |
| snow | `SnowIcon` | Snowflakes fall with stagger (custom `translateY` keyframe, per-element `animationDelay`) |
| storm/thunderstorm | `StormIcon` | Lightning flash (`motion-safe:animate-pulse`) |
| fog/mist | `FogIcon` | Fade in/out (`motion-safe:animate-pulse`) |

All animations pause automatically when `prefers-reduced-motion: reduce` is set via Tailwind's built-in `motion-safe:` variant.

---

## `prefers-reduced-motion` Strategy

Tailwind's `motion-safe:` variant applies animation classes **only** when `prefers-reduced-motion` is not `reduce`:

```tsx
// Animation runs only when motion is allowed
<g className="motion-safe:animate-spin" style={{ animationDuration: '8s' }}>
  {/* rays */}
</g>
```

This is zero-overhead — no JavaScript `matchMedia` needed at the icon level. The centralized `prefersReducedMotion()` utility (Story 1.4) will be used by `WeatherIcon` component for any programmatic checks.

---

## Implementation Constraints

1. **SVG viewBox**: All icons use `viewBox="0 0 64 64"` for consistent sizing.
2. **Colors**: Use `currentColor` for icons that should follow the surrounding text color (most icons). Use CSS custom properties (`var(--color-*)`) only for icons that need a distinct design token (e.g., accent color for condition theming). Never hardcode hex values.
3. **Animation duration**: Slow animations (6–10s) preferred over fast ones for weather icons (calm aesthetic).
4. **ARIA**: Each icon SVG includes `role="img"` and `aria-label` describing the weather condition.
5. **Sizing**: Icons accept a `size` prop (number, pixels) defaulting to 64. The value is applied to both `width` and `height` SVG attributes. CSS sizing from a parent layout takes precedence if set.
6. **Unknown conditions**: `WeatherIcon` must handle unrecognised condition strings via a TypeScript exhaustive `never` check and render `CloudyIcon` as the safe fallback. Log a `console.warn` in development.

---

## Files to Create in Story 4.1

```
src/components/WeatherIcon.tsx       # Dispatcher component (condition → icon)
src/components/icons/ClearDayIcon.tsx
src/components/icons/ClearNightIcon.tsx
src/components/icons/PartlyCloudyIcon.tsx
src/components/icons/CloudyIcon.tsx
src/components/icons/RainIcon.tsx
src/components/icons/SnowIcon.tsx
src/components/icons/StormIcon.tsx
src/components/icons/FogIcon.tsx
```
