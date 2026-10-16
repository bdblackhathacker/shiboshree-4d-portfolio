# Changelog

All notable changes to this portfolio are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/) · Versioning: [Semantic Versioning](https://semver.org/).

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
