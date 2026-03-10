# AdBlock Detection — Frontend

## Overview

Multi-heuristic adblock detection system with an accessible modal that prevents calculator usage until the ad blocker is disabled.

## Architecture

```
Page Load → CalculatorLayout
  → useAdblockDetector hook
    → detectAdblock() (4 heuristics run in parallel)
      → DOM bait (hidden ad-class div)
      → Fetch bait (/ads-bait-f7k2x.js)
      → Script load (/ads-prebid-m9q3r.js, 1.5s timeout)
      → Weak window signals (canRunAds, isAdBlockActive, __ads_bait_loaded__)
    → sendAdblockLog() via navigator.sendBeacon
  → if detected === true → render AdblockModal
```

## Detection Logic

- **Strong heuristics:** DOM bait, fetch bait, script load (3 signals)
- **Weak signals:** `window.canRunAds`, `window.isAdBlockActive`, `window.__ads_bait_loaded__`
- **Threshold:** detected = 2+ strong heuristics fire, OR 1 strong + 1 weak signal

This minimizes false positives from network timeouts or aggressive CORS policies.

## Files

| File | Purpose |
|---|---|
| `public/ads-bait-f7k2x.js` | Bait file for fetch heuristic (sets `window.__ads_bait_loaded__`) |
| `public/ads-prebid-m9q3r.js` | Bait file for script-load heuristic (sets `window.__ads_prebid_loaded__`) |
| `src/utils/adblockDetect.js` | Pure detection functions (no React dependency) |
| `src/hooks/useAdblockDetector.js` | React hook: `{ detected, loading, retry, details }` |
| `src/components/AdblockModal.js` | Accessible modal with focus trap, Retry, and Help link |
| `src/pages/help/DisableAdblockPage.js` | Step-by-step instructions for popular ad blockers |
| `src/__tests__/adblockDetect.test.js` | Jest unit tests for detection utilities |

## Integration

The adblock detector is integrated into `CalculatorLayout.js`, which is the shared layout for all calculator pages. When `detected === true`, the `AdblockModal` component renders as a non-dismissible overlay.

```jsx
// In CalculatorLayout.js
const { detected, loading, retry } = useAdblockDetector({
  location: breadcrumbPath || title || 'calculator',
});

// ...
{detected && <AdblockModal onRetry={retry} loading={loading} />}
```

## Accessibility

- Modal uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
- Focus is trapped inside the modal (Tab cycles through interactive elements)
- Escape key is prevented from closing the modal
- Body scroll is locked while the modal is visible
- Retry button receives auto-focus on mount

## Running Tests

```bash
cd frontend
npx react-scripts test --watchAll=false -- --testPathPattern=adblockDetect
```

## QA Checklist

- [ ] Enable an ad blocker (uBlock Origin, AdBlock) → modal appears on any calculator page
- [ ] Disable ad blocker → click Retry → modal dismisses, calculator is usable
- [ ] Without ad blocker → modal never appears
- [ ] Tab key cycles only between Retry button and Help link (focus trap)
- [ ] Escape key does NOT close the modal
- [ ] Click outside modal does NOT close it
- [ ] "How to disable your ad blocker" link navigates to `/help/disable-adblock`
- [ ] Help page renders correctly with instructions for all major ad blockers
- [ ] Detection log is sent to `/api/log/adblock` (check Network tab)
- [ ] Detection works on mobile browsers
- [ ] No console errors during detection
