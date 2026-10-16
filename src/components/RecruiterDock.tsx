import { Mail, Phone, FileText, Github, Linkedin, ArrowUp } from 'lucide-react'
import { PROFILE } from '../data/portfolio'
import { printResume } from '../utils/resume'

const ACTIONS = [
  { icon: Mail, label: 'Email me', href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: 'Call me', href: PROFILE.phoneHref },
  { icon: FileText, label: 'Resume → PDF', onClick: printResume },
  { icon: Linkedin, label: 'LinkedIn', href: PROFILE.links.linkedin },
  { icon: Github, label: 'GitHub', href: PROFILE.links.github }
]

export default function RecruiterDock() {
  return (
    <>
      <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex" aria-label="Recruiter quick actions">
        <div className="glass-strong flex flex-col gap-1 rounded-2xl p-1.5 shadow-premium">
          {ACTIONS.map((a) =>
            a.href ? (
              <a
                key={a.label}
                href={a.href}
                target={a.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={a.label}
                className="group relative grid h-10 w-10 place-items-center rounded-xl text-mist transition hover:bg-white/[0.07] hover:text-cyanx"
              >
                <a.icon size={17} />
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-black/85 px-2.5 py-1.5 font-mono2 text-[10px] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  {a.label}
                </span>
              </a>
            ) : (
              <button
                key={a.label}
                onClick={a.onClick}
                aria-label={a.label}
                className="group relative grid h-10 w-10 place-items-center rounded-xl text-mist transition hover:bg-white/[0.07] hover:text-rubysoft"
              >
                <a.icon size={17} />
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-black/85 px-2.5 py-1.5 font-mono2 text-[10px] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  {a.label}
                </span>
              </button>
            )
          )}
          <a
            href="#hero"
            aria-label="Back to top"
            className="group relative grid h-10 w-10 place-items-center rounded-xl text-mist transition hover:bg-white/[0.07] hover:text-gold"
          >
            <ArrowUp size={17} />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-black/85 px-2.5 py-1.5 font-mono2 text-[10px] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              Back to top
            </span>
          </a>
        </div>
        <span className="text-center font-mono2 text-[8px] tracking-[0.2em] text-mist/70">HIRE</span>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 lg:hidden" aria-label="Recruiter quick actions">
        <a href={`mailto:${PROFILE.email}`} className="glass-strong flex items-center justify-center gap-1.5 rounded-xl py-3 font-mono2 text-[11px] text-slate-100">
          <Mail size={14} className="text-cyanx" /> Email
        </a>
        <a href={PROFILE.phoneHref} className="glass-strong flex items-center justify-center gap-1.5 rounded-xl py-3 font-mono2 text-[11px] text-slate-100">
          <Phone size={14} className="text-cyanx" /> Call
        </a>
        <button onClick={printResume} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-gradient-to-r from-ruby to-[#7a0000] py-3 font-mono2 text-[11px] font-bold text-white shadow-rubyglow">
          <FileText size={14} /> Resume
        </button>
      </nav>
    </>
  )
}
