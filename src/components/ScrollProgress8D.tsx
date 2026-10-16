import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'CORE' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'WORK' },
  { id: 'contact', label: 'CONTACT' }
]

/** D3+D7 — spectrum-shifting scroll bar + dimension rail nav. */
export default function ScrollProgress8D() {
  const bar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight || 1
      const p = Math.min(Math.max(window.scrollY / max, 0), 1)
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`
      let cur = SECTIONS[0].id
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = s.id
      }
      setActive((prev) => (prev === cur ? prev : cur))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60]" aria-hidden>
        <div ref={bar} className="progress-8d h-[2px] origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
      <nav
        aria-label="Dimension rail"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      >
        {SECTIONS.map((s, i) => {
          const on = active === s.id
          return (
            <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-2.5" aria-label={s.label}>
              <span
                className={`font-mono2 text-[9px] tracking-[0.22em] transition ${
                  on ? 'text-cyanx opacity-100' : 'text-muted opacity-0 group-hover:opacity-100'
                }`}
              >
                D{i + 1} · {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  on ? 'h-6 w-1 bg-cyanx shadow-cyanglow' : 'h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60'
                }`}
              />
            </a>
          )
        })}
      </nav>
    </>
  )
}
