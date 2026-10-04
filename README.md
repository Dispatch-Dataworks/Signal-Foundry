# Signal Foundry Games

A static, Markdown-first studio site for [signalfoundry.games](https://signalfoundry.games). Signal Foundry Games is a division of Dispatch Dataworks LLC. Games, workshop ideas, and honest development updates share one content pipeline; there is no CMS, database, account system, or custom application server.

## Run locally

Use **Node.js 22.12 or newer** in the supported Node 22 line and npm. CI uses Node 22.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. To verify and preview a release:

```sh
npm run check
npm run preview
```

`npm run check` runs linting and Astro type checks, formatting checks, content validation, tests, the production build, and built-output link checks. Individual commands are `npm run lint`, `npm run format:check`, `npm run validate`, `npm test`, `npm run build`, and `npm run check:links`. Run the link check after a successful build. `npm run format` formats the repository; use a targeted Prettier invocation when editing only a few files.

## Architecture

| Location                                                       | Purpose                                                                                                    |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `src/config.ts`                                                | Studio identity, navigation, URLs, branding, featured projects, social links, analytics, and feature flags |
| `src/content.config.ts`                                        | Astro content collection loaders and schema registration                                                   |
| `src/lib/schema.ts`                                            | Strict project and devlog frontmatter schemas; the authoritative field definitions                         |
| `src/lib/content.ts`                                           | Publication gating, sorting, bench eligibility, and related-project logic                                  |
| `src/content/projects/<slug>.md`                               | One authoritative record per project, whether in games or workshop                                         |
| `src/content/about/home.md`                                    | Editable studio philosophy and Ben Townsend biography                                                      |
| `src/content/devlog/<slug>.md`                                 | Real development updates only; deliberately empty at launch                                                |
| `src/pages/`, `src/components/`, `src/layouts/`, `src/styles/` | Astro routes, reusable presentation, layouts, and responsive styling                                       |
| `public/assets/`                                               | Local images served unchanged at `/assets/…`                                                               |
| `templates/`                                                   | Authoring examples, outside every content collection                                                       |
| `scripts/`, `tests/`                                           | Content validation, built-output checks, and logic regression tests                                        |
| `.github/workflows/deploy.yml`                                 | Pull-request validation and production GitHub Pages deployment                                             |

Astro emits static HTML into `dist/`. Content is evaluated at build time. The site uses the custom-domain root, not a repository-name URL prefix.

## Site configuration

Edit `src/config.ts` rather than hardcoding studio information into components. Keep `site.url` synchronized with the production domain and `public/CNAME`. The parent business, contact email, navigation, footer copy, ordered featured project slugs, and optional bench feature are centralized here.

`socials` is intentionally empty until authoritative studio accounts are confirmed. Add only verified `{ label, href }` entries; do not guess handles or use similarly named accounts.

`branding.logo` is deliberately empty, allowing the accessible text/abstract branding fallback. `/assets/brand/logo.svg` is an original temporary wordmark, **not the final logo**. Replace it with approved branding and set `branding.logo` when ready. `/assets/brand/built-at-signal-foundry.svg` is a temporary original text/abstract badge; replace it at the same path or update `branding.badge`. `defaultSocialImage` points to an original 1200×630 `/assets/brand/social.png`, rasterized from the editable original `/assets/brand/social.svg` with the already installed Sharp library. The PNG provides broad social-preview compatibility; replace both with approved artwork when available.

## Add or update a project

1. Copy `templates/game.md` or `templates/workshop.md` to `src/content/projects/<slug>.md`.
2. Replace **every** placeholder, example URL, future example date, and image path. Remove optional fields that are not known or do not apply. Templates are not publishable starter entries.
3. Use a lowercase, hyphen-separated `slug` matching the filename exactly.
4. Write the narrative under `## Overview`, optionally `## Why We Made This`, and `## What Makes It Different`. Separate implemented features from plans.
5. Add owned/authorized assets under `public/assets/projects/<slug>/`; reference them with root-relative `/assets/projects/<slug>/…` paths.
6. Run `npm run validate` and the appropriate checks before publishing.

The four launch records are `wordweave.md`, `911-simulator.md`, `far-haul.md`, and `if-then-dungeon.md`. Do not create a second version under another collection directory. To graduate a workshop project, edit the **same file**: change `collection: workshop` to `collection: games`, set a playable status, and update the narrative, milestones, and verified actions. Its slug and identity remain stable; the collection controls its public section.

### Project frontmatter

The schema is strict: unknown keys are rejected. All text values must be nonempty when supplied. Omit an optional text key rather than setting it to `""`.

| Field                                         | Required / default | Meaning                                                                              |
| --------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `title`, `slug`, `excerpt`                    | Required           | Name, URL identity, and summary (at most 300 characters)                             |
| `collection`                                  | Required           | `games` or `workshop`                                                                |
| `status`                                      | Required           | `Concept`, `Prototype`, `Playable Demo`, `Early Access`, `Released`, or `Archived`   |
| `developmentState`                            | Optional           | `Active Development`, `On Hold`, `Maintenance`, or `Inactive`; omit when unconfirmed |
| `featured`, `pinned`                          | Default `false`    | Editorial prominence                                                                 |
| `order`                                       | Optional           | Nonnegative integer for editorial ordering                                           |
| `bench`                                       | Default `true`     | Opt into the bench; only active, nonarchived projects qualify                        |
| `tags`, `genres`, `platforms`, `technologies` | Default `[]`       | Lists of nonempty strings; only claim verified technology/platform support           |
| `audience`, `contentGuidance`                 | Optional           | Intended audience and content notes; not a substitute for a formal rating            |
| `hero`, `card`                                | Optional           | `{ src: "/assets/…", alt: "Useful description" }`                                    |
| `displayDate`                                 | Optional           | Human-readable display text                                                          |
| `sortDate`, `updated`                         | Optional           | Quoted valid calendar dates, `YYYY-MM-DD`                                            |
| `version`, `developer`, `engine`              | Optional           | Verified project metadata                                                            |
| `actions`                                     | Default `[]`       | External action buttons, described below                                             |
| `gallery`                                     | Default `[]`       | Local gallery images, described below                                                |
| `youtube`                                     | Optional           | `{ id, title, poster: { src, alt } }`; `id` must be an actual 11-character video ID  |
| `requirements`                                | Optional           | `minimum` and/or `recommended` requirement objects                                   |
| `milestones`                                  | Default `[]`       | Categorized, manually maintained roadmap entries                                     |
| `relatedProjects`                             | Default `[]`       | Existing project slugs; no self-reference                                            |
| `seo`                                         | Optional           | Optional `title`, `description`, and local `image`                                   |

Status answers **what can someone play?** Development state answers **is work happening?** Concepts and prototypes must be in the workshop. WordWeave is released; If Then Dungeon is a concept with no playable demo. Their development activity is unconfirmed, so `developmentState` is omitted rather than invented and no activity badge is shown. The two demos are explicitly known to be actively developed. Projects with unknown activity do not qualify for the bench; confirmed active projects can qualify from either collection.

Projects sort by featured/pinned prominence, then ascending `order`, then most recent `updated`/`sortDate`, then title. The home-page featured selection is controlled separately by `featuredProjects` in the site config.

### Links, media, requirements, and milestones

An action has `label`, an HTTP(S) `url`, optional `kind` (`play`, `demo`, `website`, `store`, or `github`; default `website`), and optional nonnegative integer `priority` (default `10`; lower values come first). Multiple stores are simply multiple `kind: store` actions. Use accurate labels; do not invent store pages, downloads, repositories, or play URLs.

Gallery entries have `src`, `alt`, optional `caption`, optional `type` (`screenshot`, `concept`, or `artwork`; default `screenshot`), and optional nonnegative integer `order` (default `0`). Use a real project-owned screenshot for screenshot entries. Explicitly label concept art as concept art. The launch cover illustrations are **original abstract schematic/concept placeholders, not game screenshots or final logos**; they are not presented as screenshot galleries. Use meaningful alternative text and optimized local image files.

Supported local image extensions are SVG, PNG, JPG/JPEG, WebP, and AVIF. Paths must begin `/assets/` and use letters, numbers, underscores, hyphens, and directory separators. Remote images and filenames containing spaces do not satisfy the schema. Download assets only with ownership/permission confirmed; do not reuse third-party branding or artwork.

A YouTube record requires a local poster. The player must remain a click-to-load enhancement, not an unsolicited embedded third-party request.

Each `minimum`/`recommended` requirements object needs at least one of `os`, `cpu`, `ram`, `gpu`, `storage`, `input`, `network`, or `notes`. All are optional text individually. Delete unverified fields; never guess specifications.

Milestones have `category`, `title`, optional `description`, and optional `date` display text. Categories are exactly `Completed`, `Current`, `Planned`, and `Someday / Exploring`. They are editorial notes, not percentages or automated delivery promises. Unlike `sortDate`/`updated`, a milestone's `date` is free-form display text.

`templates/game.md` demonstrates every project field. The workshop template uses a smaller starting shape with the same schema; optional metadata can be added from the game example.

## Publish a devlog update

There are **no invented launch posts**. The empty devlog collection is tracked with `.gitkeep`.

Copy `templates/devlog.md` to `src/content/devlog/<slug>.md` only when a real update exists. Required fields are `title`, `slug`, `published` (quoted valid `YYYY-MM-DD`), and `excerpt` (at most 300 characters). Optional fields are `updated` (the same date format), `draft` (default `false`), `hero` (`{ src, alt }`), `projects` (existing project slugs; default `[]`), `tags` (default `[]`), and `seo` (optional `title`, `description`, local `image`).

The template starts with `draft: true` and `published: '2099-01-01'` as two deliberate publication safeguards. Replace those dates with real dates. A draft is never public, even after its publication date. A nondraft future-dated post remains excluded until the publication day begins in **UTC**, and then only appears after a rebuild. Publication filtering applies to public devlog routes, listings, and sitemap output—not merely the visible cards. RSS and Atom feeds are intentionally excluded.

The daily scheduled deployment rebuilds the default branch at 06:17 UTC so eligible posts can appear without a new commit. GitHub schedules may run late or be disabled after prolonged repository inactivity; use **Actions → Validate and deploy Pages → Run workflow** on `main` when precise release timing matters.

## Analytics and privacy

GA4 is optional. The launch configuration has no measurement ID, so analytics is effectively disabled and no Google script should load. Set a verified `G-…` ID and keep `analytics.enabled: true` only if you want to offer analytics.

Even with an ID, Google resources and tracking must wait for an explicit opt-in. Declining retains normal site functionality. The footer's **Privacy settings** control lets visitors reopen their choice and revoke consent. Do not add tracking snippets to layouts or bypass the consent controller. YouTube also requires an explicit play action before its external player loads.

## Deploy with GitHub Pages

1. Push this repository with `main` as the production/default branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Allow the Pages deployment environment and workflow permissions required by your repository/organization. The build has read-only contents and Pages permissions; only the deploy job gets `pages: write` and `id-token: write`, and uses the `github-pages` environment.
4. Set the custom domain to `signalfoundry.games`. `public/CNAME` already contains that hostname and must remain in the built output.
5. At your DNS provider, use GitHub's current [custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages). An apex domain needs the documented GitHub Pages A/AAAA records or supported ALIAS/ANAME records; a subdomain uses a CNAME to your actual `<owner>.github.io` host. Do not point DNS at the repository path.
6. Complete GitHub's domain verification if applicable, wait for DNS and the certificate to provision, and enable **Enforce HTTPS** in Pages settings.
7. Confirm the deployed root, game/workshop detail routes, local images, and HTTPS redirects. If the domain changes, update the Pages setting, DNS, `site.url`, and `public/CNAME` together.

The workflow runs install, lint/type checks, format checks, content validation, tests, build, and built-link checks **before** uploading an artifact. Pull requests build and validate but never deploy. Pushes to `main`, daily default-branch schedules, and manual runs on `main` can deploy. Manual runs on other branches cannot publish. The deployment concurrency group does not cancel an in-progress deployment.

Actions are official `checkout@v4`, `setup-node@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, and `deploy-pages@v4`; their selected versions were checked against the GitHub advisory database when introduced. Review dependency/action advisories during upgrades.

## Launch source and asset gaps

Starter copy uses the owner's project brief, not guessed implementation details. In particular:

- WordWeave: a released, fully playable browser game, originating in a need to help one of Ben's kids with English grades.
- 911 Simulator: a playable demo, with the remainder actively developed. No engine, implementation details, or unverified platforms are claimed.
- Far Haul: a playable browser v0.1.0 prototype for open-world sci-fi freight/exploration. Current shipbuilding, freight/economy, local flight, docking, and FTL details are verified against its updated project site. The first-person interstellar vision includes charted routes into frontier/unknown systems, physical walkable modular ships with a boxy utilitarian design, planetary landing/exploration, and EVA repair. Walking, planetary, EVA, and broader frontier features are not implemented. A commercial installable release is a possible future, with no current storefront or price.
- If Then Dungeon: a game-first workshop concept, no playable demo, intended for roughly ages 10–15 as an informal target. The owner's planned design includes a logic-first grid dungeon, card-built rule rows with Sensors/Actions/Operators, IF/THEN/ELSE, NOT/AND/OR and precedence, loops/ticks, deterministic retry/debugging loops, controlled enemy randomness, unused-card Pressure, monsters/hazards/upgrades, and replayability. None is claimed implemented. Campaign structure and themes are intended, but specific planned campaign themes are unavailable to verify because the supplied repository returned 404; no names or details are invented.

The initial project-website research encountered DNS/access failures, and the supplied If Then Dungeon repository returned 404. Those failures do not prove that the projects are unavailable. The parent-business site and Far Haul sources were subsequently recovered from their authoritative public repositories. No authoritative studio social profiles were verified on the parent site, so `socials` remains empty; personal profiles are not substituted for studio accounts. For other unavailable sources, missing screenshots, final logos, video IDs, requirements, release/version dates, and unverified links remain omitted rather than fabricated.

WordWeave, 911 Simulator, and If Then Dungeon each have an editable fallback `cover.svg` and an original `cover.png` social-preview export at 1200×630. The PNG contains the entire schematic/concept illustration, including its labeling; it is not a screenshot. These files were generated directly with the already installed Sharp library, with no extra dependency or helper script. Far Haul retains its editable fallback SVG but uses authorized real game screenshots for its hero/card/gallery and a screenshot-derived `gameplay-social.png` for SEO; its obsolete fallback PNG was removed.

### Verified sources and asset provenance

- Owner-supplied public action URLs: [WordWeave — Play Now](https://wordweave.games/) and [911 Simulator — Try Demo](https://911-simulator.com/). These are authoritative links from the owner's brief even though their site content could not be independently retrieved during initial research; access failures do not justify dropping the play/demo actions or inventing implementation details.
- Parent-business presentation: [Dispatch-Dataworks/Public-Static](https://github.com/Dispatch-Dataworks/Public-Static), especially [`index.html`](https://github.com/Dispatch-Dataworks/Public-Static/blob/main/index.html) and [`portfolio.html`](https://github.com/Dispatch-Dataworks/Public-Static/blob/main/portfolio.html). Use this for authoritative family context, not personal-account discovery.
- Far Haul source: [benjaminarthurt/FarHaul](https://github.com/benjaminarthurt/FarHaul), reviewed at commit [`9068eff5fb17ae5f7f59293da1db90300dfb7cc4`](https://github.com/benjaminarthurt/FarHaul/tree/9068eff5fb17ae5f7f59293da1db90300dfb7cc4) on 2026-10-04.
- Current Far Haul description and screenshot captions: [`site/index.html` at that commit](https://github.com/benjaminarthurt/FarHaul/blob/9068eff5fb17ae5f7f59293da1db90300dfb7cc4/site/index.html), published as the [project website](https://benjaminarthurt.github.io/FarHaul/), with its [browser demo](https://benjaminarthurt.github.io/FarHaul/play/).
- **Source discrepancy:** the repository's older README describes a builder-only prototype and lists flight as future work. The newer `site/index.html` and current source include freight contracts/economy, local flight/docking, and FTL jumps. The launch entry follows the updated source rather than repeating the stale README. Neither source makes walking, planetary landing, or EVA playable yet.
- Authorized project-owned screenshots were fetched directly, without cloning, from `https://raw.githubusercontent.com/benjaminarthurt/FarHaul/9068eff5fb17ae5f7f59293da1db90300dfb7cc4/site/img/`: `builder-cargo.jpg`, `dock-economy.jpg`, `flight-run.jpg`, and `jump.jpg`. The project site explicitly identifies these as taken from the game. Existing Sharp optimized them into local WebP images; `builder-cargo.jpg` also supplies the 1200×630 gameplay social PNG. Permission comes from the studio owner. No third-party corporate logos, stock art, fonts, or other unrelated imagery were copied.

Before enriching an entry, consult the **owner-supplied project website or repository** and confirm any details with Ben. For unavailable sources, keep the relevant fields omitted and retain the clearly marked local original fallback art. Record an asset's ownership/source with the approved asset handoff and a factual caption where useful; never label a placeholder as captured gameplay. Replace the temporary studio wordmark, badge, social card, and project covers when authorized originals are available.
