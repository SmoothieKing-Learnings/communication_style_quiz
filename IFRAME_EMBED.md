# Embedding the Quiz in Rise 360 (or any iframe host)

A reference for future devs working on this quiz when it's hosted inside Articulate Rise 360 or any other iframe-based environment. Documents what works, what doesn't, and why.

---

## Iframe code

Paste into a Rise 360 **Embed block** (not the Custom Code Block — they're different).

### Recommended (single fixed height, compromise between mobile and desktop)

```html
<iframe src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1" width="100%" height="900" style="border:0; display:block; width:100%;" scrolling="auto"></iframe>
```

900px is the compromise. Tune it:
- **700** → favors desktop (no blank space, but mobile content scrolls inside iframe)
- **1300** → favors mobile (all content fits without internal scroll, but desktop shows blank space below)
- **900** → middle ground

### Dynamic height that adapts to real device width

```html
<iframe src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1" style="border:0; display:block; width:100%; height:max(700px, 1500px - 70vw);" scrolling="auto"></iframe>
```

`height:max(700px, 1500px - 70vw)` means: at least 700px, and gets taller as the viewport gets narrower. On a real phone (~400px wide), iframe ≈ 1220px. On a real desktop (~1400px wide), iframe ≈ 700px. **Caveat:** does not respond to Rise's mobile preview pane (Rise's mobile preview is a visual clip, not a real viewport change). Only takes effect on actual devices.

### Dual block (one per device, if Rise exposes per-device visibility)

If Rise's Embed block has a "Hide on mobile" / "Hide on desktop" toggle (check the block's edit/pencil settings), this is the cleanest setup:

```html
<!-- Desktop block (set "Hide on mobile" in Rise) -->
<iframe src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1" width="100%" height="700" style="border:0; display:block; width:100%;" scrolling="auto"></iframe>
```

```html
<!-- Mobile block (set "Hide on desktop" in Rise) -->
<iframe src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1" width="100%" height="1300" style="border:0; display:block; width:100%;" scrolling="auto"></iframe>
```

Each device gets the height that fits it. No compromise.

### Attribute reference

| Attribute | Why |
|---|---|
| `?embed=1` on the URL | Triggers the app's embed mode — strips the outer white card so the iframe renders flat. |
| `width="100%"` | Iframe fills the Embed block's full width. |
| `style="border:0"` | Removes the iframe's default browser border. Modern browsers ignore the legacy `frameborder="0"` attribute. |
| `style="display:block"` | Removes the small inline-element gap browsers add by default. |
| No `background` color | Lets the host page (Rise's lesson background) show through any iframe area beyond the content, so empty space looks intentional rather than a colored void. |
| `scrolling="auto"` | Shows a scrollbar inside the iframe when content overflows the iframe height. |

### Common gotchas when pasting into Rise

- **Use straight double quotes** (`"`) — not curly/smart quotes. Pasting from Word, Slack, or some chat clients can silently convert quotes and Rise will reject the iframe.
- **No text between `<iframe>` and `</iframe>`** — Rise rejects iframe HTML with content between the tags.
- **`<style>` tags may be stripped** — Rise's Embed block sometimes drops `<style>` blocks for security. Stick to inline `style` attributes on the iframe element.
- **Wrapping `<div>` may be stripped** — same reason. Keep the iframe top-level when possible.

---

## Code changes that were made to support embedding

### 1. Embed mode detection — `src/components/LayoutWrapper.jsx`

Added auto-detection of iframe embedding:

```js
function isEmbedded() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('embed') === '1') return true;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}
```

Two triggers: `?embed=1` URL param (explicit) **or** any iframe context (auto-detected).

### 2. Stripped chrome when embedded — `src/components/LayoutWrapper.jsx`

Standalone visits keep the pretty white card with shadow/border. Embedded mode renders flat with no card, no padding, transparent background — so it doesn't look like a card-inside-a-card inside Rise's own block.

### 3. Transparent iframe document — `src/index.css`

Added an `.embed-mode` class to the body/html elements when embedded, which removes the cream `bg-quiz-bg` from the iframe document body. Result: when iframe is taller than the content, the empty space is transparent (host page shows through) instead of a giant cream void.

### 4. Narrower max-width in embed mode — `src/components/LayoutWrapper.jsx`

Standalone uses `max-w-2xl` (672px). Embed mode uses `max-w-md` (448px). Reason: text wrapping is the primary driver of content height variance between mobile and desktop. Capping width tighter makes desktop wrap more like mobile — content height becomes ~80% similar across viewports, so a single iframe height fits both better.

### 5. Fixed overflowing pill on Results screen — `src/components/ResultsScreen.jsx`

The points pill (e.g., "4/10 pts") was breaking out of its card on narrow widths because `flex-shrink-0` kept it full size while the heading wrapped. Fix: stack the pill below the heading on mobile, sit beside it on `sm:` and up. Added `overflow-hidden` on the card and `min-w-0 break-words` on the heading.

---

## Things that were tried and did NOT work — don't repeat these

### Vertical centering of content (`my-auto`)

Idea: center content in iframe so empty cream looks intentional. Failed because flexbox `justify-center` cuts off the top of overflowing content (when iframe < content). Made the bug worse on Results screen.

### Container queries (`cqw`) for responsive iframe height

Idea: use `height: max(700px, 1500px - 70cqw)` on the iframe so narrower containers get taller iframes. Works in real browsers. **Does not work in Rise's mobile preview** because Rise's mobile preview is just a visual clip of the desktop-rendered iframe, not a real viewport change. Rise doesn't actually narrow the embed block's container in mobile preview mode.

### Dynamic iframe resize via `postMessage`

Idea: have the React app post its content height to the parent, parent resizes the iframe. **Rise's parent doesn't listen for resize messages**, and Rise's sandboxing prevents adding a custom listener that could find and resize the Embed block. Confirmed in Rise community forums.

### Auto-fitting iframe to content

Iframes don't have a "size to content" mode. The `height` attribute is fixed unless dynamically resized via JS bridging (see above — not possible in Rise).

---

## Fundamental Rise 360 constraints (gotchas to know)

| Constraint | Implication |
|---|---|
| **Iframe height is one fixed value** | Cannot be different per device with a single iframe. |
| **Rise mobile preview ≠ real mobile** | Mobile preview is a visual clip in a desktop browser. Responsive CSS won't change behavior between Rise's preview modes. |
| **Sandboxed download blocked** | `html2canvas` → file download silently fails inside Rise. The current "Share Result" button works only when the quiz is loaded standalone (outside Rise). |
| **No `<style>` blocks in Embed input** | Rise's Embed block accepts iframe HTML but may strip `<style>` tags or other extras. Stick to inline styles on the iframe element. |
| **Embed block has built-in padding** | Rise wraps every block in a styled container. Some padding is unavoidable around the iframe. Check the block's Format menu (block padding S/M/L) to minimize. |
| **Per-device block visibility** | Some Rise plans/block types let you show a block only on mobile or desktop. If available, this enables a dual-iframe pattern (separate mobile and desktop iframes with different heights). Worth checking in the block's edit settings. |

---

## How to verify mobile behavior properly

Rise's mobile preview pane is misleading for iframe sizing. To verify how real mobile users will see the quiz:

1. Open the published GitHub Pages URL directly in a browser:
   `https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1`
2. Open Chrome DevTools (F12 / Cmd+Option+I).
3. Click the device toolbar icon (top-left of DevTools, phone/tablet icon).
4. Pick "iPhone 14 Pro" or "Pixel 7" preset.
5. The quiz reflows at real mobile viewport dimensions.

This is the only reliable way to verify mobile responsiveness without an actual phone.

---

## Build and deploy

The project deploys to GitHub Pages automatically via `.github/workflows/deploy.yml` whenever changes land on `main`. Local commands:

```bash
npm run dev      # local dev server
npm run build    # produces dist/ for deploy
npm run test     # runs vitest
```

After merging a PR to `main`, GitHub Actions runs the build and publishes. Takes ~2 minutes. Rise iframes pointing at the GitHub Pages URL will pick up the new version on next page load (may need hard-refresh due to browser cache).

---

## File map for future changes

| File | Purpose |
|---|---|
| `src/components/LayoutWrapper.jsx` | Embed-mode detection and chrome-stripping |
| `src/index.css` | Body/html background rules including `.embed-mode` overrides |
| `src/components/QuizScreen.jsx` | Question + options layout (responsive padding lives here) |
| `src/components/ResultsScreen.jsx` | Results page (donut chart, score breakdown, style cards) |
| `src/data/questionsData.js` | The 10 questions and their `styleId`-tagged options |
| `src/data/stylesData.js` | The 4 style definitions (name, focus, strengths, blind spots, color) |
| `src/skills/calculateResults.js` | Tally logic (framework-agnostic, easy to port if needed) |

---

## Open trade-off (no clean fix exists)

Because iframe height is a single fixed number set in Rise:
- **Tall iframe (~1300px)** → mobile content fits without internal scroll, desktop has visible blank space below content.
- **Short iframe (~700px)** → desktop has no blank, mobile content scrolls inside the iframe (worse UX on phones).
- **Compromise (~900px)** → some of both. Current recommendation.

If Rise ever exposes per-device block visibility for Embed blocks, the cleanest fix is two embed blocks (one per device) with different heights — see "Per-device block visibility" in the constraints table above.
