import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GitHubStrip from './components/GitHubStrip'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import RecruiterDock from './components/RecruiterDock'
import CommandPalette from './components/CommandPalette'
import ToastHost from './components/Toast'
import Preloader from './components/Preloader'
import CursorSystem from './components/CursorSystem'
import AuroraLayers from './components/AuroraLayers'
import ScrollProgress8D from './components/ScrollProgress8D'
import DimensionHUD from './components/DimensionHUD'
import Experience from './three/Experience'
import type { ViewMode } from './three/SceneReactor'
import { gsap, ScrollTrigger } from './lib/gsap'
import { usePerfMode } from './hooks/useDevicePerf'
import { usePointer8D } from './hooks/usePointer8D'

export default function App() {
  const progressRef = useRef(0)
  const velocityRef = useRef(0)
  const modeRef = useRef<ViewMode>('ui')
  const [velocity, setVelocity] = useState(0)
  const { lowPower, setManual } = usePerfMode()
  usePointer8D()

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.4 })
      }
    }
    document.addEventListener('click', onAnchor)

    const onMode = (e: Event) => {
      modeRef.current = (e as CustomEvent<ViewMode>).detail
    }
    window.addEventListener('view-mode', onMode)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('view-mode', onMode)
      window.removeEventListener('load', onLoad)
      document.removeEventListener('click', onAnchor)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setVelocity(velocityRef.current), 250)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="noise relative min-h-screen text-slate-100">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-mono2 focus:text-xs focus:text-black"
      >
        Skip to content
      </a>
      <Preloader />
      <ScrollProgress8D />
      <Experience lowPower={lowPower} progressRef={progressRef} velocityRef={velocityRef} modeRef={modeRef} />
      <AuroraLayers lowPower={lowPower} />
      <Navbar lowPower={lowPower} onTogglePower={() => setManual(lowPower ? false : true)} />
      <main className="relative z-10">
        <Hero velocity={velocity} />
        <TechMarquee />
        <div className="mx-auto max-w-[1280px] px-4 pt-16 md:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 rounded-full border border-line bg-white/[0.02] px-5 py-2.5 font-mono2 text-[10px] tracking-[0.24em] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-cyanx opacity-50" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyanx" />
            </span>
            ENTERING THE 8TH DIMENSION — SCROLL DRIVES TIME · CURSOR DRIVES LIGHT
          </div>
        </div>
        <Timeline />
        <Skills />
        <Projects />
        <GitHubStrip />
        <Education />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer velocity={velocity} />
      </div>
      <RecruiterDock />
      <CommandPalette lowPower={lowPower} onTogglePower={() => setManual(lowPower ? false : true)} />
      <ToastHost />
      <DimensionHUD lowPower={lowPower} />
      <CursorSystem />
    </div>
  )
}
