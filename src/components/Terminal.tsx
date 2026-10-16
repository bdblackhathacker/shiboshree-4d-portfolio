import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TerminalSquare, X, Minus, Download } from 'lucide-react'
import { PROFILE, EXPERIENCES, SKILLS } from '../data/portfolio'
import { downloadATSResume, printResume } from '../utils/resume'

type Line = { kind: 'in' | 'out' | 'json' | 'err'; text: string }

const HELP = `available commands:
  help                  show this help
  whoami                profile summary
  skills --backend      backend JSON
  skills --frontend     frontend JSON
  skills --all          all categories
  experience --latest   latest role
  experience --all      full timeline
  contact               email / phone / links
  download-cv           download ATS resume (.txt)
  resume --pdf          open print-ready PDF resume
  clear                 clear terminal`

function cmd(input: string): Line[] {
  const c = input.trim().toLowerCase()
  if (!c) return []
  if (c === 'help') return [{ kind: 'out' as const, text: HELP }]
  if (c === 'whoami')
    return [{ kind: 'json' as const, text: JSON.stringify({ name: PROFILE.name, title: PROFILE.title, location: PROFILE.location, stack: ['Rails', 'PostgreSQL', 'Hotwire', 'React', 'TypeScript'] }, null, 2) }]
  if (c === 'skills --backend')
    return [{ kind: 'json' as const, text: JSON.stringify(SKILLS['Backend & Architecture'].slice(0, 7).map((s) => s.name), null, 2) }]
  if (c === 'skills --frontend')
    return [{ kind: 'json' as const, text: JSON.stringify(SKILLS['Frontend'].slice(0, 7).map((s) => s.name), null, 2) }]
  if (c === 'skills --all')
    return [{ kind: 'json' as const, text: JSON.stringify(Object.fromEntries(Object.entries(SKILLS).map(([k, v]) => [k, v.map((s) => s.name)])), null, 2) }]
  if (c === 'experience --latest') {
    const e = EXPERIENCES[0]
    return [{ kind: 'json' as const, text: JSON.stringify({ role: e.role, company: e.company, period: e.period, stack: e.stack }, null, 2) }]
  }
  if (c === 'experience --all')
    return [{ kind: 'json' as const, text: JSON.stringify(EXPERIENCES.map((e) => ({ role: e.role, company: e.company, period: e.period })), null, 2) }]
  if (c === 'contact')
    return [{ kind: 'json' as const, text: JSON.stringify({ email: PROFILE.email, phone: PROFILE.phone, github: PROFILE.links.github, linkedin: PROFILE.links.linkedin }, null, 2) }]
  if (c === 'download-cv') {
    downloadATSResume()
    return [{ kind: 'out' as const, text: '✓ ATS resume download started → Shiboshree_Roy_ATS_Resume.txt' }]
  }
  if (c === 'resume --pdf') {
    printResume()
    return [{ kind: 'out' as const, text: '✓ print-ready resume opened → Save as PDF (Ctrl/Cmd + P)' }]
  }
  return [{ kind: 'err' as const, text: `command not found: ${input} — type 'help'` }]
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'shiboshree@4d-portfolio:~$ connected. type `help` to query the system.' }
  ])
  const [value, setValue] = useState('')
  const [min, setMin] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const history = useMemo(() => lines, [lines])

  const submit = (raw: string) => {
    const clean = raw.trim()
    if (clean.toLowerCase() === 'clear') {
      setLines([])
      setValue('')
      return
    }
    const out = cmd(clean)
    setLines((p) => [...p, { kind: 'in' as const, text: `➜ ~ ${clean}` }, ...out].slice(-80))
    setValue('')
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 99999 }))
  }

  if (min)
    return (
      <button
        onClick={() => setMin(false)}
        className="chip flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono2 text-[11px] text-cyanx"
      >
        <TerminalSquare size={14} /> open terminal
      </button>
    )

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: -240, right: 240, top: -110, bottom: 110 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="card scanlines relative w-full max-w-[430px] cursor-grab overflow-hidden active:cursor-grabbing"
      style={{ borderTop: '2px solid #E10600', boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}
    >
      <div className="flex items-center justify-between border-b border-line bg-[#0A0E15] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-2.5 font-mono2 text-[10px] tracking-[0.08em] text-muted">recruiter@shiboshree — zsh</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button aria-label="download ats resume" onClick={() => submit('download-cv')} className="rounded-md p-1.5 text-muted transition hover:bg-white/[0.06] hover:text-cyanx">
            <Download size={13} />
          </button>
          <button aria-label="minimize" onClick={() => setMin(true)} className="rounded-md p-1.5 text-muted transition hover:bg-white/[0.06] hover:text-cyanx">
            <Minus size={13} />
          </button>
          <button aria-label="clear" onClick={() => setLines([])} className="rounded-md p-1.5 text-muted transition hover:bg-white/[0.06] hover:text-rubysoft">
            <X size={13} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="terminal-scroll h-[236px] cursor-text overflow-y-auto px-4 py-3.5 font-mono2 text-[11.5px] leading-relaxed"
      >
        {history.map((l, i) => (
          <pre
            key={i}
            className={
              l.kind === 'in'
                ? 'whitespace-pre-wrap text-cyanx'
                : l.kind === 'json'
                  ? 'whitespace-pre-wrap text-emerald-300/85'
                  : l.kind === 'err'
                    ? 'whitespace-pre-wrap text-red-400'
                    : 'whitespace-pre-wrap text-[#B9C3D3]'
            }
          >
            {l.text}
          </pre>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(value)
          }}
          className="mt-1.5 flex items-center gap-2"
        >
          <span className="text-rubysoft">➜</span>
          <span className="text-cyanx">~</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-transparent text-ink outline-none placeholder:text-muted/50"
            placeholder="try: skills --backend"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-line bg-black/25 px-3.5 py-2.5">
        {['skills --backend', 'experience --latest', 'contact', 'download-cv'].map((c) => (
          <button
            key={c}
            onClick={() => submit(c)}
            className="chip rounded-md px-2.5 py-1.5 font-mono2 text-[9.5px] tracking-[0.06em] text-muted transition hover:border-cyanx/40 hover:text-cyanx"
          >
            {c}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
