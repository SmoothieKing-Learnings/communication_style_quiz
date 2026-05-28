# Embedding in Rise 360 or any LMS iframe

The **SmoothieKing Learnings unified iframe contract**, shared across every experience in the `sk-learning` repo. The bridge lives at [`src/utils/iframeBridge.js`](./src/utils/iframeBridge.js); the only value that differs per project is the message namespace. For this project the namespace is **`communicationQuiz`** and the deployed URL is:

> `https://smoothieking-learnings.github.io/communication_style_quiz/`

---

## 1. Universal URL parameters

| Param | Value | Effect |
| --- | --- | --- |
| `?embed=1` | flag | Strips outer chrome via `LayoutWrapper` so the experience renders flat inside an iframe. Auto-detected when the page is loaded inside any iframe — explicit param is for previewing the embed view outside an iframe. |
| `?autostart=1` | flag | Skip the welcome screen and start the experience immediately. `?skipIntro=1` is accepted as an alias. |
| `?parentOrigin=<encoded>` | URL-encoded origin | Locks `postMessage` to a specific parent origin. Without this, messages are sent to `*` and inbound messages from any origin are accepted. Drop the param if you'll export to SCORM where the host origin is unknown. |

---

## 2. Recommended iframe snippets

Paste into a Rise 360 **Embed block** (not the Custom Code Block — they're different) or any LMS that accepts iframe HTML.

### Recommended — single fixed height, compromise between mobile and desktop

```html
<iframe
  src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1"
  width="100%"
  height="900"
  style="border:0; display:block; width:100%;"
  scrolling="auto"
  title="Communication Style Quiz"
  allow="autoplay"></iframe>
```

900px is the compromise. Tune it:

- **700** → favors desktop (no blank space, but mobile content scrolls inside iframe)
- **1300** → favors mobile (all content fits without internal scroll, but desktop shows blank space below)
- **900** → middle ground

### Dynamic height that adapts to real device width

```html
<iframe
  src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1"
  style="border:0; display:block; width:100%; height:max(700px, 1500px - 70vw);"
  scrolling="auto"
  title="Communication Style Quiz"
  allow="autoplay"></iframe>
```

`height:max(700px, 1500px - 70vw)` means: at least 700px, and gets taller as the viewport gets narrower. On a real phone (~400px wide), iframe ≈ 1220px. On a real desktop (~1400px wide), iframe ≈ 700px.

**Caveat:** does not respond to Rise's mobile preview pane (Rise's mobile preview is a visual clip, not a real viewport change). Only takes effect on actual devices.

### Dual block — per-device visibility

If your Rise plan exposes "Hide on mobile" / "Hide on desktop" toggles on the Embed block (check the block's edit/pencil settings), this is the cleanest setup:

```html
<!-- Desktop block (set "Hide on mobile" in Rise) -->
<iframe
  src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1"
  width="100%" height="700"
  style="border:0; display:block; width:100%;" scrolling="auto"
  title="Communication Style Quiz" allow="autoplay"></iframe>
```

```html
<!-- Mobile block (set "Hide on desktop" in Rise) -->
<iframe
  src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1"
  width="100%" height="1300"
  style="border:0; display:block; width:100%;" scrolling="auto"
  title="Communication Style Quiz" allow="autoplay"></iframe>
```

### Origin-locked snippet (recommended for live Rise lessons)

```html
<iframe
  src="https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1&parentOrigin=https%3A%2F%2Frise.articulate.com"
  width="100%" height="900"
  style="border:0; display:block; width:100%;" scrolling="auto"
  title="Communication Style Quiz" allow="autoplay"></iframe>
```

---

## 3. Universal `postMessage` contract

The bridge namespaces every outbound event with `communicationQuiz:`. The `complete` signal is intentionally **not** namespaced — Rise 360's completion field listens for that exact bare message.

### Outbound — app → host

| Event | Payload | Fires when |
| --- | --- | --- |
| `communicationQuiz:ready` | — | App has mounted |
| `communicationQuiz:start` | — | User started the quiz |
| `communicationQuiz:results` | `{ topStyles, allScores }` | Results screen rendered |
| `communicationQuiz:restart` | — | User restarted from results |
| `communicationQuiz:resize` | `{ width, height, desiredHeight }` | Mount + resize + orientation change |
| `communicationQuiz:wheel` | `{ deltaY }` | rAF-throttled wheel forwarding |
| `complete` | — | (Not namespaced) Rise lesson completion — fires once on the results screen |

### Inbound — host → app

| Event | Effect |
| --- | --- |
| `communicationQuiz:start` | Start the quiz immediately, skipping welcome |
| `communicationQuiz:restart` | Return to the welcome screen |

### Wire up a host listener

```js
window.addEventListener('message', (e) => {
  // Optional: only trust messages from your iframe origin.
  // if (e.origin !== 'https://smoothieking-learnings.github.io') return
  const data = e.data
  if (!data?.type) return
  if (data.type === 'complete') {
    // Rise's completion signal — already wired through the completion field.
    return
  }
  if (!String(data.type).startsWith('communicationQuiz:')) return
  switch (data.type) {
    case 'communicationQuiz:ready':    /* iframe mounted */                  break
    case 'communicationQuiz:start':    /* user started the quiz */            break
    case 'communicationQuiz:results':  /* { topStyles, allScores } */         break
    case 'communicationQuiz:restart':  /* user restarted from results */      break
    case 'communicationQuiz:resize':   /* { width, height, desiredHeight } */ break
    case 'communicationQuiz:wheel':    /* { deltaY } */                       break
  }
})
```

### Send a command to the iframe

```js
const iframe = document.querySelector('iframe')
iframe.contentWindow.postMessage({ type: 'communicationQuiz:start' },   '*')
iframe.contentWindow.postMessage({ type: 'communicationQuiz:restart' }, '*')
```

---

## 4. Enabling Rise 360 completion

The bridge already calls `emitComplete()` at the right terminal screen. To wire the lesson to actually mark complete:

1. In the Rise Code Block settings panel, enable **Set completion requirements**.
2. Paste this exact one-liner into the field (this is what Rise listens for):

   ```js
   window.parent.postMessage({ type: 'complete'}, '*')
   ```

The completion field is just *registering* the bare `complete` message Rise should accept — the actual fire comes from the iframe. Idempotent: once the lesson is complete, repeat fires are ignored.

---

## 5. Common gotchas when pasting into Rise

- **Use straight double quotes** (`"`) — not curly/smart quotes. Pasting from Word, Slack, or some chat clients can silently convert quotes and Rise will reject the iframe.
- **No text between `<iframe>` and `</iframe>`** — Rise rejects iframe HTML with content between the tags.
- **`<style>` tags may be stripped** — Rise's Embed block sometimes drops `<style>` blocks for security. Stick to inline `style` attributes on the iframe element.
- **Wrapping `<div>` may be stripped** — same reason. Keep the iframe top-level when possible.

---

## 6. Things that were tried and did NOT work

### Vertical centering of content (`my-auto`)

Idea: center content in iframe so empty cream looks intentional. Failed because flexbox `justify-center` cuts off the top of overflowing content when the iframe is shorter than the content.

### Container queries (`cqw`) for responsive iframe height

Idea: use `height: max(700px, 1500px - 70cqw)` so narrower containers get taller iframes. Works in real browsers. **Does not work in Rise's mobile preview** because Rise's mobile preview is a visual clip of the desktop-rendered iframe, not a real viewport change.

### Dynamic iframe resize via `postMessage`

The bridge emits `communicationQuiz:resize` with a `desiredHeight` recommendation. **Rise's parent doesn't listen for it**, and Rise's sandboxing prevents adding a custom listener that could find and resize the Embed block. The `resize` event is preserved for non-Rise hosts (intranet pages, custom LMS shells) that *can* honor it.

### Auto-fitting iframe to content

Iframes don't have a "size to content" mode. The `height` attribute is fixed unless dynamically resized via JS bridging.

---

## 7. Fundamental Rise 360 constraints

| Constraint | Implication |
| --- | --- |
| **Iframe height is one fixed value** | Cannot be different per device with a single iframe. |
| **Rise mobile preview ≠ real mobile** | Mobile preview is a visual clip in a desktop browser. Responsive CSS won't change behavior between Rise's preview modes. |
| **Sandboxed download blocked** | `html2canvas` → file download silently fails inside Rise. The "Share Result" button works only when the quiz is loaded standalone (outside Rise). |
| **No `<style>` blocks in Embed input** | Rise's Embed block accepts iframe HTML but may strip `<style>` tags or other extras. Stick to inline styles on the iframe element. |
| **Embed block has built-in padding** | Rise wraps every block in a styled container. Some padding is unavoidable around the iframe — check the block's Format menu (block padding S/M/L) to minimize. |
| **Per-device block visibility** | Some Rise plans/block types let you show a block only on mobile or desktop. If available, this enables a dual-iframe pattern (separate mobile and desktop iframes with different heights). |
| **CSP / framing** | If you host on a domain that emits `X-Frame-Options: DENY` or `frame-ancestors 'none'`, the iframe will refuse to load. GitHub Pages doesn't set these headers — it Just Works™. |

---

## 8. How to verify mobile behavior properly

Rise's mobile preview pane is misleading for iframe sizing. To verify how real mobile users will see the experience:

1. Open the published GitHub Pages URL directly in a browser:
   `https://smoothieking-learnings.github.io/communication_style_quiz/?embed=1`
2. Open Chrome DevTools (F12 / Cmd+Option+I).
3. Click the device toolbar icon (top-left of DevTools, phone/tablet icon).
4. Pick "iPhone 14 Pro" or "Pixel 7" preset.
5. The experience reflows at real mobile viewport dimensions.

This is the only reliable way to verify mobile responsiveness without an actual phone.

---

## 9. Adapting the bridge for a new project

The bridge is one file. Drop it into `src/utils/iframeBridge.js` and change exactly four lines at the top:

```js
const NAMESPACE = 'yourProject'
const ASPECT_RATIO = 1.6        // height = width × this
const MIN_DESIRED_HEIGHT = 600
const MAX_DESIRED_HEIGHT = 1100
```

Then wire it in your root component:

```jsx
import { useIframeBridge } from './utils/iframeBridge'

useIframeBridge({
  onStart:   startQuiz,
  onRestart: restartQuiz,
  screen:    currentScreen,
  screenEvents: {
    quiz:    { event: 'start' },
    results: { event: 'results', payload: { /* … */ }, complete: true },
    welcome: { whenFrom: ['results'], event: 'restart' },
  },
})
```

You get `?embed=1`, `?autostart=1`, `?parentOrigin=`, the namespaced `postMessage` contract, the Rise 360 completion fire, debounced resize reporting, and rAF-throttled wheel forwarding — all without any further wiring.

---

## 10. File map for future changes

| File | Purpose |
| --- | --- |
| `src/utils/iframeBridge.js` | Universal LMS embed contract — postMessage events + `useIframeBridge` hook |
| `src/components/LayoutWrapper.jsx` | Embed-mode detection and chrome-stripping |
| `src/skills/embed.js` | Legacy alias — re-exports `isEmbedded()` from the bridge |
| `src/index.css` | Body / html background rules, including `.embed-mode` overrides |
| `src/data/questionsData.js` | Question copy and option `styleId` mapping |
| `src/data/stylesData.js` | Style definitions (name, focus, strengths, blind spots, color) |
| `src/skills/calculateResults.js` | Tally logic (framework-agnostic, easy to port) |

---

## 11. Open trade-off

Because iframe height is a single fixed number set in Rise:

- **Tall iframe (~1300px)** → mobile content fits without internal scroll, desktop has visible blank space below content.
- **Short iframe (~700px)** → desktop has no blank, mobile content scrolls inside the iframe (worse UX on phones).
- **Compromise (~900px)** → some of both. Current recommendation.

If Rise ever exposes per-device block visibility for Embed blocks, the cleanest fix is two embed blocks (one per device) with different heights — see "Dual block" in §2 above.
