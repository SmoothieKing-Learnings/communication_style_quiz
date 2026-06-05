# Communication Style Quiz

A short, ten-scenario communication self-assessment from the **SmoothieKing Learnings** team. Designed to live inside a Rise 360 lesson and to be shareable as a standalone link.

**Live experience:** https://smoothieking-learnings.github.io/communication_style_quiz/

---

## About the Experience

The quiz walks a team member through 10 scenarios pulled from real store life — a wrong-milk remake, coaching an enhancer ask, a closing-shift slump — and surfaces their primary Communication Style across four archetypes. Results include the style's priority, mantra, strengths, blind spots, and a downloadable / shareable summary image. When two or more styles tie for the top score, the result is presented as a "Hybrid Communicator" with all top styles shown side-by-side.

### The Four Communication Styles

| Letter | Style | Priority | Mantra |
| --- | --- | --- | --- |
| A | The Direct Communicator | efficiency | clear is efficient |
| B | The Enthusiastic Communicator | engagement | energy is contagious |
| C | The Collaborative Communicator | connection | lead by listening |
| D | The Precise Communicator | accuracy | the details matter |

Each style's full strengths, blind spots, and detailed descriptions live in [`src/data/stylesData.js`](src/data/stylesData.js). The question set lives in [`src/data/questionsData.js`](src/data/questionsData.js).

---

## Participant Experience

- **Welcome.** A branded intro and a single "Let's Blend!" call to action.
- **Quiz.** Ten scenarios presented one at a time with a progress bar, back navigation, and a clear "Continue" gate.
- **Results.** Headline with the participant's primary style, donut chart of how their answers distributed across the four styles, the full per-style score breakdown, the dedicated strengths / blind-spots panel for their top style, and an accordion for the full description.
- **Share.** A one-tap option that captures the result card via `html2canvas` and uses the device's native share sheet on mobile, with a clean image download fallback in browsers that don't support Web Share.

Nothing is stored, transmitted, or sent anywhere — the quiz runs entirely in the browser.

---

## Design System

This project ships with the **SmoothieKing Learnings unified design system**, identical across every experience in the `sk-learning` repo. The tokens live in [`tailwind.config.js`](./tailwind.config.js).

### Color tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `brand` | `#930018` | Primary buttons, progress fill, headings on cream |
| `brand-deep` | `#40000F` | Body copy, secondary text |
| `brand-bright` | `#E31F26` | Active / alert accents |
| `bg-primary` | `#FFF9EF` | Default cream surface |
| `bg-light` | `#FFDEE5` | Warm accent surfaces |
| `bg-soft-blue` | `#D6E0FF` | Cool accent surfaces |
| `accent-amber` | `#F4A261` | Style accent (warm honey — Enthusiastic) |
| `accent-coral` | `#E76F51` | Style accent (burnt sienna — Direct) |
| `accent-teal` | `#2A9D8F` | Style accent (deep teal — Collaborative) |
| `accent-gold` | `#E9C46A` | Style accent (soft gold — Precise) |

Legacy aliases (`quiz-bg`, `quiz-primary`, `quiz-text`, `style-teacher`, `style-role`, `style-coach`, `style-supporter`) map to the same hex values and are preserved so existing class names keep working.

Body copy on the primary color switches to `bg-primary` (`#FFF9EF`) to satisfy WCAG contrast.

### Typography

| Token | Family | Usage |
| --- | --- | --- |
| `font-display` / `font-heading` | **Lora**, Georgia, serif | Hero titles, screen headings, result names |
| `font-body` | **Poppins**, system-ui, sans-serif | All body copy, buttons, labels |

Both families are loaded from Google Fonts in [`index.html`](./index.html) and applied to `<body>` via [`src/index.css`](./src/index.css).

### Iframe / LMS workflow

Embed mode is shared across the system. The universal utility lives at [`src/utils/iframeBridge.js`](./src/utils/iframeBridge.js) and offers:

- `?embed=1` — strips chrome via [`LayoutWrapper`](./src/components/LayoutWrapper.jsx) so the experience renders flat inside an iframe.
- `?autostart=1` — skips the welcome screen.
- `?parentOrigin=<encoded>` — locks `postMessage` delivery to one host origin.
- A namespaced `postMessage` contract (`communicationQuiz:*`) for `ready`, `start`, `results`, `restart`, `resize`, `wheel`.
- A bare `{ type: 'complete' }` fire on the results screen so a Rise 360 Code Block can mark the lesson complete.
- A `useIframeBridge()` React hook that wires everything in one call.

Full embed snippets, sizing guidance, and Rise 360 gotchas live in [IFRAME_EMBED.md](./IFRAME_EMBED.md).

---

## Accessibility

- WCAG-compliant contrast on every screen of the warm cream palette.
- Screen-reader announcements at every screen change (e.g. "Question 2 of 10…").
- Full keyboard navigation with visible focus indicators and Enter / Space selection.
- Touch targets meet the 44×44 px standard used across iOS and Android.
- Mobile-first layout that stays legible on small viewports without horizontal scroll.
- Continuous accessibility auditing via `@axe-core/react` during development.

---

## Tech Stack

- **React 18** on Vite
- **Tailwind CSS** locked to the SmoothieKing Learnings design tokens
- **Recharts** for the donut visualization on the results screen
- **html2canvas** for the share-as-image flow, with Web Share API and a graceful download fallback
- **lucide-react** for icons
- **@axe-core/react** for dev-time accessibility auditing
- **Vitest + React Testing Library** for unit and component tests

Routing is handled with simple React state (`currentScreen`) rather than `react-router-dom`, which keeps the app compatible with GitHub Pages without 404s on refresh.

---

## Project Layout

```
src/
  App.jsx                  screen-state router (Welcome / Quiz / Results)
  components/
    WelcomeScreen.jsx
    QuizScreen.jsx
    ResultsScreen.jsx
    LayoutWrapper.jsx      mobile-first wrapper + embed-mode chrome stripping
    ProgressBar.jsx
  data/
    stylesData.js          4 styles, colors, strengths, blind spots
    questionsData.js       10 questions, 4 options each
  skills/
    calculateResults.js    scoring and tie handling
    exportAndShare.js      html2canvas → Web Share / download
    a11yUtils.js           announcer, keyboard handling, axe auditor
    embed.js               legacy alias — re-exports isEmbedded() from iframeBridge
  utils/
    iframeBridge.js        universal LMS embed contract (postMessage + hook)
```

---

## Local Development

```bash
npm install
npm run dev      # vite dev server
npm run test     # vitest
npm run lint     # eslint
npm run build    # production bundle to /dist
npm run preview  # serve the built bundle
```

The Vite `base` is set to `/communication_style_quiz/` in [`vite.config.js`](./vite.config.js) to match the GitHub Pages path.

---

## Deployment

The site is published to GitHub Pages automatically on every push to `main` via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). Pages source is configured to **GitHub Actions** in repo settings.

---

Maintained by the **SmoothieKing Learnings** team. Issues and contributions are welcome at the [GitHub repository](https://github.com/SmoothieKing-Learnings/communication_style_quiz).
