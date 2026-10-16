import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Zap, FileText, Search } from 'lucide-react'
import { printResume } from '../utils/resume'

const LINKS = [
  { href: '#hero', label: 'Core' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Work' },
  { href: '#contact', label: 'Contact' }
]

export default function Navbar({ lowPower, onTogglePower }: { lowPower: boolean; onTogglePower: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'glass-strong' : 'bg-gradient-to-b from-[#05070B]/80 to-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 md:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/shiboshree.png"
            alt="Shiboshree Roy"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg border border-white/15 object-cover"
          />
          <span className="leading-none">
            <span className="font-display text-[13px] font-semibold tracking-[0.16em] text-ink">SHIBOSHREE ROY</span>
            <span className="mt-1 block font-mono2 text-[8.5px] tracking-[0.26em] text-muted">FULL-STACK · RAILS</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-muted transition hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event('palette-open'))}
            title="Command palette (Ctrl/⌘ + K)"
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-lg border border-line px-3 py-2 font-mono2 text-[10px] tracking-[0.14em] text-muted transition hover:border-white/20 hover:text-ink md:flex"
          >
            <Search size={12} />
            <span>⌘K</span>
          </button>
          <button
            onClick={onTogglePower}
            title={lowPower ? 'Switch to ULTRA 3D' : 'Switch to 60FPS ECO'}
            aria-label="Toggle performance mode"
            className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
              lowPower ? 'border-emerald-400/30 text-emerald-300' : 'border-line text-muted hover:text-cyanx'
            }`}
          >
            <Zap size={14} />
          </button>
          <button
            onClick={printResume}
            className="hidden items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 font-mono2 text-[10px] tracking-[0.14em] text-ink transition hover:border-white/20 hover:bg-white/[0.05] md:flex"
          >
            <FileText size={12} /> RÉSUMÉ
          </button>
          <a href="#contact" className="btn-primary px-4 py-2 font-display text-[12.5px]">
            Hire Me
          </a>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-line lg:hidden" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>
      <motion.div style={{ scaleX }} className="h-px origin-left bg-gradient-to-r from-ruby via-gold to-cyanx opacity-80" />
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="glass-strong overflow-hidden lg:hidden">
            <div className="flex flex-col gap-1 border-t border-line px-4 py-3">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 font-mono2 text-[12px] tracking-[0.14em] text-ink hover:bg-white/[0.05]">
                  {l.label.toUpperCase()}
                </a>
              ))}
              <button onClick={printResume} className="mt-1 flex items-center gap-2 rounded-lg border border-line px-3 py-2.5 font-mono2 text-[11px] text-ink">
                <FileText size={13} /> RÉSUMÉ → PDF
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  window.dispatchEvent(new Event('palette-open'))
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-mono2 text-[11px] tracking-[0.14em] text-ink hover:bg-white/[0.05]"
              >
                <Search size={13} /> COMMAND PALETTE ⌘K
              </button>
              <button onClick={onTogglePower} className="rounded-lg border border-line px-3 py-2.5 text-left font-mono2 text-[11px] text-muted">
                {lowPower ? 'Switch to ULTRA 3D' : 'Switch to 60FPS ECO'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
