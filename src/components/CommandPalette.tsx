import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Home,
  Clock,
  Cpu,
  FolderKanban,
  Github,
  GraduationCap,
  Mail,
  Copy,
  Phone,
  FileText,
  Download,
  Linkedin,
  Zap,
  CornerDownLeft
} from 'lucide-react'
import { PROFILE } from '../data/portfolio'
import { downloadATSResume, printResume } from '../utils/resume'
import { toast } from './Toast'

type Cmd = {
  id: string
  label: string
  hint: string
  icon: ReactNode
  run: () => void
}

const goTo = (hash: string) => {
  const a = document.createElement('a')
  a.href = hash
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const copy = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast(`${label} copied → ${text}`)
  } catch {
    toast('Clipboard blocked by browser — copy manually')
  }
}

export default function CommandPalette({ lowPower, onTogglePower }: { lowPower: boolean; onTogglePower: () => void }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const commands = useMemo<Cmd[]>(
    () => [
      { id: 'n-hero', label: 'Go to Core', hint: '01 · Hero', icon: <Home size={15} />, run: () => goTo('#hero') },
      { id: 'n-timeline', label: 'Go to Timeline', hint: '02 · Time-travel', icon: <Clock size={15} />, run: () => goTo('#timeline') },
      { id: 'n-skills', label: 'Go to Skills', hint: '03 · Constellation', icon: <Cpu size={15} />, run: () => goTo('#skills') },
      { id: 'n-work', label: 'Go to Work', hint: '04 · Case studies', icon: <FolderKanban size={15} />, run: () => goTo('#projects') },
      { id: 'n-github', label: 'Go to GitHub', hint: '05 · Live repos', icon: <Github size={15} />, run: () => goTo('#github') },
      { id: 'n-education', label: 'Go to Education', hint: '06 · Certs', icon: <GraduationCap size={15} />, run: () => goTo('#education') },
      { id: 'n-contact', label: 'Go to Contact', hint: '07 · Handshake', icon: <Mail size={15} />, run: () => goTo('#contact') },
      { id: 'a-copy-email', label: 'Copy email', hint: PROFILE.email, icon: <Copy size={15} />, run: () => copy(PROFILE.email, 'Email') },
      { id: 'a-copy-phone', label: 'Copy phone', hint: PROFILE.phone, icon: <Copy size={15} />, run: () => copy(PROFILE.phone, 'Phone') },
      { id: 'a-mail', label: 'Email me', hint: 'opens mail client', icon: <Mail size={15} />, run: () => { window.location.href = `mailto:${PROFILE.email}` } },
      { id: 'a-call', label: 'Call me', hint: PROFILE.phone, icon: <Phone size={15} />, run: () => { window.location.href = PROFILE.phoneHref } },
      { id: 'a-pdf', label: 'Résumé → PDF', hint: 'print-ready ATS file', icon: <FileText size={15} />, run: () => printResume() },
      { id: 'a-txt', label: 'Résumé → ATS plain text', hint: 'instant download', icon: <Download size={15} />, run: () => downloadATSResume() },
      { id: 'a-github', label: 'Open GitHub profile', hint: 'repositories', icon: <Github size={15} />, run: () => window.open(PROFILE.links.github, '_blank', 'noopener') },
      { id: 'a-linkedin', label: 'Open LinkedIn profile', hint: 'connect', icon: <Linkedin size={15} />, run: () => window.open(PROFILE.links.linkedin, '_blank', 'noopener') },
      {
        id: 'a-perf',
        label: lowPower ? 'Switch to ULTRA 3D' : 'Switch to 60FPS ECO',
        hint: 'render performance',
        icon: <Zap size={15} />,
        run: () => {
          onTogglePower()
          toast(lowPower ? 'ULTRA 3D enabled' : '60FPS ECO enabled')
        }
      }
    ],
    [lowPower, onTogglePower]
  )

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(s) || c.hint.toLowerCase().includes(s) || c.id.includes(s))
  }, [commands, q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQ('')
        setIdx(0)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => {
      setOpen(true)
      setQ('')
      setIdx(0)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('palette-open', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('palette-open', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60)
  }, [open])

  useEffect(() => {
    setIdx(0)
  }, [q])

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [idx])

  const exec = (cmd: Cmd | undefined) => {
    if (!cmd) return
    setOpen(false)
    cmd.run()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[65] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="card w-full max-w-xl overflow-hidden rounded-2xl"
            style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search size={15} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setIdx((i) => Math.min(i + 1, filtered.length - 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setIdx((i) => Math.max(i - 1, 0))
                  } else if (e.key === 'Enter') {
                    e.preventDefault()
                    exec(filtered[idx])
                  } else if (e.key === 'Escape') {
                    setOpen(false)
                  }
                }}
                placeholder="Type a command — navigate, copy, résumé, profiles…"
                className="w-full bg-transparent font-mono2 text-[12.5px] text-ink outline-none placeholder:text-muted/50"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="hidden shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono2 text-[9px] text-muted sm:block">ESC</span>
            </div>

            <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center font-mono2 text-[11px] text-muted">no commands match "{q}"</p>
              )}
              {filtered.map((c, i) => (
                <button
                  key={c.id}
                  data-active={i === idx}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => exec(c)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    i === idx ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${i === idx ? 'border-cyanx/40 text-cyanx' : 'border-line text-muted'}`}>
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[13.5px] font-medium text-ink">{c.label}</span>
                    <span className="block truncate font-mono2 text-[9.5px] tracking-[0.08em] text-muted">{c.hint}</span>
                  </span>
                  {i === idx && <CornerDownLeft size={13} className="shrink-0 text-muted" />}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono2 text-[9.5px] tracking-[0.14em] text-muted">
              <span>↑↓ NAVIGATE · ↵ RUN</span>
              <span>
                <span className="text-cyanx">⌘K</span> TOGGLE
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
