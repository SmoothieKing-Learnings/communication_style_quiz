# Communication Style Quiz

A short, four-style communication self-assessment built for Smoothie King store leaders and team members. Hosted by **SmoothieKing-Learnings** and delivered as a static, single-page web app.

**Live site:** https://smoothieking-learnings.github.io/communication_style_quiz/

---

## What it does

The quiz walks a team member through 10 scenarios pulled from real store life — a wrong-milk remake, coaching an enhancer ask, a closing-shift slump — and surfaces their primary Communication Style across four archetypes. Results include the style's priority, mantra, strengths, blind spots, and a downloadable / shareable summary image. When two or more styles tie for the top score, the result is presented as a "Hybrid Communicator" with all top styles shown side-by-side.

## The four Communication Styles

| Letter | Style | Priority | Mantra |
| --- | --- | --- | --- |
| A | The Direct Communicator | efficiency | clear is efficient |
| B | The Enthusiastic Communicator | engagement | energy is contagious |
| C | The Collaborative Communicator | connection | lead by listening |
| D | The Precise Communicator | accuracy | the details matter |

Each style's full strengths, blind spots, and detailed descriptions live in [src/data/stylesData.js](src/data/stylesData.js). The question set lives in [src/data/questionsData.js](src/data/questionsData.js).

## Design system

The quiz uses a warm, Smoothie King-aligned palette enforced through Tailwind:

- **Background:** `#FFF9EF`
- **Primary action:** `#930018` (buttons, progress bars)
- **Body text:** `#40000F` — switched to `#FFF9EF` whenever text sits on the primary action color, to satisfy WCAG contrast
- **Chart palette:** `#F4A261`, `#E76F51`, `#2A9D8F`, `#E9C46A` (one per style)

## Accessibility

The quiz ships mobile-first with WCAG-compliant contrast on every screen, ≥44×44px touch targets, full keyboard navigation (Tab to focus, Enter/Space to select), and screen-reader announcements at each question and on the final result. `@axe-core/react` runs in development for live structural auditing.

## Tech stack

- **React 18** on Vite
- **Tailwind CSS** for styling
- **Recharts** for the donut visualization on the results screen
- **html2canvas** for the share-as-image flow, with Web Share API and a graceful download fallback
- **lucide-react** for icons
- **@axe-core/react** for dev-time accessibility auditing
- **Vitest + React Testing Library** for unit and component tests

Routing is handled with simple React state (`currentScreen`) rather than `react-router-dom`, which keeps the app compatible with GitHub Pages without 404s on refresh.

## Local development

```bash
npm install
npm run dev      # vite dev server
npm run test     # vitest
npm run lint     # eslint
npm run build    # production bundle to /dist
npm run preview  # serve the built bundle
```

The Vite `base` is set to `/communication_style_quiz/` in [vite.config.js](vite.config.js) to match the GitHub Pages path.

## Deployment

The site is published to GitHub Pages automatically on every push to `main` via [.github/workflows/deploy.yml](.github/workflows/deploy.yml). The workflow:

1. Checks out the repo and sets up Node 20 with npm cache
2. Runs `npm ci` and `npm run build`
3. Uploads `/dist` as the Pages artifact and deploys via `actions/deploy-pages`

Manual runs are available from the Actions tab using `workflow_dispatch`. Pages source is configured to **GitHub Actions** in repo settings.

## Embedding

The quiz is designed to embed cleanly inside Articulate Rise 360 or any iframe host. The `?embed=1` query parameter trims chrome for embedded contexts. See [IFRAME_EMBED.md](IFRAME_EMBED.md) for ready-to-paste snippets and sizing guidance.

## Project layout

```
src/
  App.jsx                  screen-state router (Welcome / Quiz / Results)
  components/
    WelcomeScreen.jsx
    QuizScreen.jsx
    ResultsScreen.jsx
    LayoutWrapper.jsx      mobile-first wrapper, max-w-2xl
    ProgressBar.jsx
  data/
    stylesData.js          4 styles, colors, strengths, blind spots
    questionsData.js       10 questions, 4 options each
  skills/
    calculateResults.js    scoring and tie handling
    exportAndShare.js      html2canvas → Web Share / download
    a11yUtils.js           announcer, keyboard handling, axe auditor
    embed.js               iframe-host helpers
```

## Maintained by

The **SmoothieKing-Learnings** team. Issues and contributions are welcome at the [GitHub repository](https://github.com/SmoothieKing-Learnings/communication_style_quiz).
