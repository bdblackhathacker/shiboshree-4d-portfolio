# Shiboshree Roy — 4D Interactive Portfolio

**v3.1.0** · React (Vite) + TypeScript + Tailwind + React Three Fiber + GSAP ScrollTrigger 4D portfolio.
Release history: [CHANGELOG.md](./CHANGELOG.md)

## 4D architecture
- **3D:** floating Ruby crystal (`RubyCrystal.tsx`), orbiting stack nodes (`OrbitNodes.tsx`), particle field, glowing Z-axis circuit (`CircuitPath.tsx`).
- **4th dimension (time & kinetic reactivity):**
  - `CameraRig.tsx` — scroll progress + scroll velocity + cursor parallax + FOV kick.
  - `src/lib/gsap.ts` — ScrollTrigger registered, GSAP ticker drives Lenis (canonical Lenis + ScrollTrigger sync in `App.tsx`).
  - `Timeline.tsx` — GSAP ScrollTrigger station HUD tracks which career era is in view; progress bar scrubs via `onUpdate`.
  - `SceneReactor.tsx` — toggling **View UI / View System Architecture** on project cards dispatches `view-mode`; the WebGL scene lerps fog, background and light balance live.

## Run
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Performance
- Auto ECO mode on mobile / save-data / ≤4 cores: reduced particles, dpr=1, no antialias, no Html labels (`useDevicePerf.ts`).
- Navbar toggle switches ULTRA ↔ 60FPS ECO manually.
- `AdaptiveDpr` + fog + capped geometry; production build is code-split (three / motion / vendor / index chunks).

## Sections
Hero + draggable terminal (`skills --backend`, `experience --latest`, `contact`, `download-cv`), scroll flythrough timeline with GSAP HUD, filterable skill constellation, tilt project cards with UI/Architecture SVG toggle, education/certs, mailto contact portal + ATS resume download.
