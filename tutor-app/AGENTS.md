<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ABC Tutoring — Website Prototype

## Project summary

`tutor-app` — a marketing + booking website for Dana's tutoring service, "ABC Tutoring." Visitors should be able to learn about the service, browse available tutors, and book one. Bookings should be reflected back in the app immediately (tutor list / detail view should show updated availability for the current visitor without a manual refresh feeling required).

This is a **working prototype**, not a production SaaS — favor a simple, demoable implementation over building auth, payments, or a real backend unless asked.

## Actual stack (verify against `node_modules/next/dist/docs/` before assuming behavior — this is Next 16, not Next 14/15)

- Next.js `16.3.4`, App Router, TypeScript `^5` (strict mode on)
- React `19.2.8` / react-dom `19.2.8`
- Tailwind CSS `^4` via `@tailwindcss/postcss` — this is **v4's CSS-first config**: there is no `tailwind.config.js` here, so theme/palette customization (see Aesthetic section below) belongs in `app/globals.css` using `@theme`, not a JS config file. Don't create a `tailwind.config.js` out of habit.
- ESLint `^9`, flat config (`eslint.config.mjs`) built on `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Path alias `@/*` → project root (see `tsconfig.json`)
- No database, no state library, no analytics SDK installed yet — see "Still needs setup" below
- Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`

Known Next.js gotcha carried forward from 15.x (confirm it still applies in 16 via the docs above before writing route code): dynamic route `params` and `searchParams` in Server Components are async (`Promise`) and must be `await`ed — relevant to `app/tutors/[id]/page.tsx` and any booking route that reads a tutor id or slot from the URL.

## Pages

Keep this to 3–4 pages total, per Dana's request. Map onto the App Router like:

1. **Home (`app/page.tsx`)** — explains the service: who it's for, how it works, a warm intro to Dana/the tutors, and a clear CTA into the tutor list ("Find a tutor").
2. **Tutors (`app/tutors/page.tsx`)** — browsable list/grid of available tutors (photo, name, subject(s), short bio, maybe rate/availability). Each tutor should be clickable into more detail.
3. **Tutor detail (`app/tutors/[id]/page.tsx`)** — enough info to decide, plus the primary "Book" action. (If detail is instead a modal/expansion on the Tutors page, that's fine too — just don't add it as a *5th* page on top of a separate route.)
4. **Booking (`app/tutors/[id]/book/page.tsx`, or `app/book/page.tsx`)** — the booking flow/confirmation. After a successful booking, update visible state so the tutor's availability reflects it (e.g. a booked slot disappears or shows as taken) without requiring a manual reload.

Do not add extra pages (pricing, blog, FAQ, etc.) unless Dana asks — she was explicit that 3–4 pages is the right scope.

## Aesthetic / design direction

Dana's own words: **"clean and friendly," explicitly not dark, not corporate, not like a big test-prep chain** (think Kumon/Sylvan/Mathnasium — avoid that vibe).

Practical guidance:
- Light backgrounds, generous whitespace, rounded corners over sharp edges.
- Warm, approachable color palette — define it as Tailwind v4 `@theme` tokens in `app/globals.css` (e.g. warm neutrals plus one or two friendly accent hues), not a dark or high-contrast corporate palette.
- Friendly, human typography — avoid stiff serif/all-caps "institutional" type treatments.
- Photos/illustrations should feel personable (real-feeling tutor photos or friendly illustration, not stock-photo test-prep imagery).
- Copy tone should sound like a small, caring local business, not a franchise.
- Do not default to a dark-mode-first or dark hero section — this was explicitly called out as unwanted.

## Analytics (PostHog)

Dana's three questions to answer, and how each should be instrumented:

1. **"Which tutors do people look at most?"**
   - Fire a `tutor_profile_viewed` event (or `tutor_card_clicked` for list views vs `tutor_profile_viewed` for detail views) with a `tutor_id` / `tutor_name` property whenever a visitor views a tutor's card or detail page.

2. **"Do they book, or just leave?"**
   - This is a funnel: `tutor_profile_viewed` → `booking_started` → `booking_completed`, all carrying `tutor_id` so it can be broken down per-tutor in PostHog.
   - Fire `booking_started` when the visitor enters the booking flow for a specific tutor, and `booking_completed` on confirmed booking (include `tutor_id`, and ideally `slot_time`).
   - This lets Dana build a PostHog funnel/insight per tutor to see view→book conversion, and see who "just leaves."

3. **"Where visitors came from, especially the Facebook group."**
   - Rely on PostHog's built-in UTM/referrer capture (autocapture + `$pageview` already records `utm_source`, `utm_medium`, `utm_campaign`, and referrer) — no custom event needed. Have Dana tag links posted to the Facebook group, e.g. `?utm_source=facebook_group&utm_medium=social&utm_campaign=tutor_launch`.
   - Set up a PostHog insight/dashboard broken down by `utm_source` so Facebook-group-driven visits are visible on their own, and cross-reference with the funnel above to see if that traffic converts.

Implementation notes for this specific repo:
- `posthog-js` is **not yet installed** — add it (`npm install posthog-js`).
- `.env` exists but is currently empty — add `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` there (it's already gitignored via `.env*` in `.gitignore`, so that's safe).
- Initialize PostHog client-side via a small client-component provider mounted in `app/layout.tsx` (root layout), with autocapture/pageview capture on.
- Consider a reverse-proxy rewrite in `next.config.ts` for PostHog ingestion so ad blockers don't drop events — `next.config.ts` is currently empty/default, so this would be a new addition there.
- Keep `tutor_id` as the one stable identifier across all events/properties so all three of Dana's questions can be answered from the same event schema.

## Booking → live update behavior

When a booking is completed, the app's visible state (tutor availability/slots) should update immediately for that session — client state driven by the booking action (React state/context, or a refetch) rather than a manual reload. Real-time multi-user sync (websockets) is not necessary for the prototype; updating the current visitor's own view immediately is sufficient.

## Still needs setup (nothing beyond default `create-next-app` exists yet)

- Tutor + booking data: no DB is set up — use seed/mock data (a local JSON file or in-memory store is fine for a prototype) rather than provisioning a hosted database.
- `posthog-js` dependency and provider wiring (see Analytics above).
- PostHog env vars in `.env`.
- Tailwind v4 theme tokens for the "clean and friendly" palette in `app/globals.css`.
- The actual page routes under `app/` (currently just the default scaffold).

## Out of scope for the prototype (unless Dana asks)

- Real payments/checkout
- Tutor-side login/dashboard
- Real user accounts/auth for visitors
- Email/SMS confirmations (a simple on-screen confirmation is enough)
- Additional pages beyond the 3–4 agreed on
