# Studio design system

- Desktop-first, quiet developer-tool UI; native window chrome retained in v0.1.
- Semantic tokens live in theme.json and src/theme/presets.ts. No raw colors in feature pages. Platform fonts, 13–14pt text; 4/8/12/16/24 spacing, 6pt control radius.
- Wrap nsh/base behavior, including keyboard and focus, in src/ui. Clear disabled, pressed, hover and focus states.
- Wide: persistent navigation and component inspector. Compact: navigation above content, inspector inline. Independent main scroll, stable layout.
- Motion inventory: button hover/press (150ms colors/opacity), switch thumb and track, tabs indicator (NSH), slider/selection, progress, motion playground (200ms). All app-owned transitions use motion-reduce:transition-none. Navigation changes immediately; collapse currently instantaneous to avoid layout churn. Dialog uses NSH fade. Verify all in light/dark on Windows/macOS/Web; do not infer results from tests.
- Review: keyboard/focus, screen reader labels, contrast, clipping at 800×560 and 1280×800, scrolling and high DPI, error states. Theme palette contrast and native screenshot checks pending real-device review.

