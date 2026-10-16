# Changelog

All notable changes to this portfolio are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/) · Versioning: [Semantic Versioning](https://semver.org/).

## [3.0.1] — 2026-10-16

### Fixed

- **Tech marquee loop seam** — the row carried its spacing as a flex `gap` (15 gaps for 16 spans), so the `translateX(-50%)` cycle was 20 px short of the true content period and visibly jumped on every restart. Spacing now lives inside each item, so the loop is mathematically seamless.
- **Marquee first impression** — a leading spacer keeps `RUBY ON RAILS 7` fully clear of the left edge-fade mask at load and on every cycle restart (previously the opening characters sat in the fade, so the ticker could read as "N RAILS 7").

### Changed

- **Marquee pauses on hover** — every stack item can be read without chasing the ticker.

## [3.0.0] — 2026-10-16

Version 3 — command palette, live GitHub feed, accessibility pass, and real working profile links.

### Added

- **Command palette (`⌘K` / `Ctrl+K`)** — keyboard-driven launcher for navigation (all 7 sections), copy email/phone, mail/call, résumé PDF & ATS text, GitHub/LinkedIn, and render-mode switching. Full keyboard support (`↑↓` navigate, `↵` run, `ESC` close) with highlighted active row and scroll-follow.
- **`Toast` system** — lightweight event-driven notifications for clipboard actions and mode changes, with stacked auto-dismiss.
- **Live GitHub section (`05`)** — fetches real repositories from the GitHub API (`sort=pushed`, top 6 by stars then recency) with language dots, stars, forks, and last-push age; shimmer skeleton while loading; the section self-hides if the API is unreachable.
- **Navbar ⌘K button** — opens the palette from the header (desktop) and from the mobile menu.
- **Skip-to-content link** — first focusable element for keyboard/screen-reader users.
- **Live FPS meter** in the footer — real frames-per-second sampled via `requestAnimationFrame` (replaces the static "60FPS SAFE" label).

### Changed

- **GitHub links fixed to the real account** (`bdblackhathacker`) across profile data and JSON-LD `sameAs` — the previous `ShiboshreeRoy` handle returned 404.
- Section numbering updated for the new GitHub station: Education `05 → 06`, Contact `06 → 07`.
- Footer shows `4D CORE v3.0`.

### Fixed

- **`prefers-reduced-motion` is now honored** — the OS-level setting forces ECO render mode and a global stylesheet rule neutralizes CSS animations/transitions.

## [2.0.0] — 2026-10-16

Version 2 — enterprise-grade redesign, recruiter tooling, and personal branding.

### Added

- **Portrait branding** — hero portrait card (grayscale → color on hover), navbar avatar, and contact avatar sourced from the personal brand image.
- **Favicon set** — generated 16/32/180/192 px icons from the portrait for browser tabs, iOS home screen, and Android.
- **Recruiter dock** — fixed quick-action rail on desktop (Email · Call · Résumé PDF · LinkedIn · GitHub · Top) and a bottom action bar on mobile.
- **PDF résumé generator** — `printResume()` opens a clean, ATS-safe, print-ready resume (Save as PDF) with a graceful HTML-download fallback for popup-blocked browsers.
- **`resume --pdf` terminal command** alongside the existing `download-cv`.
- **SEO layer** — Open Graph + Twitter cards, canonical URL, keywords, and JSON-LD `Person` structured data (jobTitle, contact, sameAs, knowsAbout, image).
- **GSAP ScrollTrigger integration** — GSAP ticker drives Lenis (canonical sync), station HUD locks to the timeline card in view, HUD progress bar scrubs via `onUpdate`.
- **`SceneReactor`** — toggling *View UI / View System Architecture* now lerps WebGL fog, background, and light balance (true 4D state reactivity).
- **`CHANGELOG.md`** — release history.

### Changed

- **Design system v2** — calmer enterprise surfaces: hairline borders, unified `.card` surface, restrained glow, brighter muted text, editorial section headings with outline index numbers, segmented filters, underline tabs.
- **Timeline** — rebuilt as a single-rail editorial layout with large outline station numbers and a slim sticky HUD chip (replaces alternating zig-zag).
- **Skill matrix** — uniform tile grid with level bars, white segmented filter control, and refined node inspector (replaces scaled chip constellation).
- **Hero** — editorial type scale, live Dhaka clock (GMT+6), status row, hairline metrics bar; portrait card with terminal layered over it.
- **Terminal** — flat enterprise chrome (traffic-light dots, monospace title), hairline command chips.
- **Bundle** — code-split into `three` / `motion` / `vendor` / `index` chunks for caching and parallel loading.

### Fixed

- Skills grid no longer re-animates on every search keystroke.
- Removed leftover invalid utility class on the hero lead paragraph.

## [1.0.0] — 2026-10-16

Initial release.

### Added

- React (Vite) + TypeScript + Tailwind cyberpunk-enterprise portfolio.
- 4D WebGL core: ruby crystal, orbiting stack nodes, particle field, glowing Z-axis circuit, cursor parallax camera rig with velocity FOV kick.
- Scroll-driven time-travel timeline across 3 career stations (MFOSL, Orgatro IT, Weinspect).
- Draggable recruiter terminal (`skills --backend`, `experience --latest`, `contact`, `download-cv`, …) with JSON responses.
- Filterable skill constellation (39 skills, 4 planes) with inspector.
- Tilt-enabled project cards with UI ↔ System Architecture SVG toggle.
- Education, certifications, mailto contact portal, ATS `.txt` résumé download.
- Auto ECO performance mode (mobile / save-data / low cores) + manual ULTRA ↔ 60FPS toggle.
