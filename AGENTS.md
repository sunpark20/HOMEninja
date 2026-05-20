# AGENTS.md

HOMEninja is a Next.js static-first product site. Keep this file as startup
guardrails only; load the linked docs only when the task touches that area.

## Load First

- Read the user's request and inspect the relevant files before coding.
- Prefer surgical edits that directly support the request.
- Do not add dependencies or new abstractions unless the current task requires
  them.

## Non-Negotiables

- Keep the site static-first. Use Server Components by default; use Client
  Components only for Canvas, browser APIs, scrolling, or interactive state.
- Keep app data in `data/`. TMT editing is the exception and flows through
  `app/api/tmt/route.ts`.
- Do not introduce Three.js or other 3D libraries. Space visuals should stay
  CSS, SVG, Canvas, or existing assets.
- Preserve the mobile-first dark space theme.
- Use OKLCH colors. Avoid pure `#000` and `#fff`.
- Follow conventional commits when asked to commit: `feat:`, `fix:`, `docs:`,
  `refactor:`, etc.

## UI Guardrails

For UI work, load `docs/UI_GUIDE.md` and, if needed,
`.claude/skills/impeccable/SKILL.md`.

Avoid these patterns unless the user explicitly asks for them:

- Gradient text using `background-clip: text`
- Colored `border-left` or `border-right` stripes wider than `1px`
- `backdrop-filter: blur()` glassmorphism
- Neon/glow `box-shadow` animations
- Purple/indigo/cyan gradient cliches
- Blurred gradient orb backgrounds
- Bounce or elastic easing
- Cards nested inside cards

## Lazy-Load Map

- Product requirements: `docs/PRD.md`
- Architecture and data flow: `docs/ARCHITECTURE.md`
- Architecture decisions and tradeoffs: `docs/ADR.md`
- UI design system and anti-patterns: `docs/UI_GUIDE.md`
- App data: `data/galaxies.ts`, `data/tmt.ts`, `data/tmt.json`
- Shared types: `types/`

## Commands

- `npm run dev` - local dev server
- `npm run lint` - ESLint over app/components/data/types
- `npm run build` - production build
- `npm run test` - node test suite

Before handing off code changes, run the checks relevant to the touched area.
For broad app changes, run `npm run lint && npm run build && npm run test`.
