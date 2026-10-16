import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, Network, ExternalLink } from 'lucide-react'
import { PROJECTS, type Project } from '../data/portfolio'
import SectionHeading from './SectionHeading'

function ArchSVG({ p }: { p: Project }) {
  return (
    <div className="rounded-xl border border-line bg-black/35 p-4">
      <svg viewBox="0 0 560 200" className="w-full" role="img" aria-label={`${p.title} architecture`}>
        {p.archNodes.map((n, i) => {
          const x = 20 + i * 135
          return (
            <g key={n.id}>
              <rect x={x} y={55} width={115} height={80} rx={10} fill="#0A0E15" stroke={p.accent} strokeOpacity={0.45} />
              <text x={x + 57.5} y={88} textAnchor="middle" fill="#FFFFFF" fontSize={12} fontWeight={600} fontFamily="Space Grotesk">
                {n.label}
              </text>
              <text x={x + 57.5} y={108} textAnchor="middle" fill="#97A3B6" fontSize={9.5} fontFamily="JetBrains Mono">
                {n.sub}
              </text>
              {i < p.archNodes.length - 1 && (
                <g>
                  <line x1={x + 115} y1={95} x2={x + 135} y2={95} stroke={p.accent} strokeWidth={1.5} strokeDasharray="4 4" strokeOpacity={0.8}>
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="0.9s" repeatCount="indefinite" />
                  </line>
                  <polygon points={`${x + 133},90.5 ${x + 141},95 ${x + 133},99.5`} fill={p.accent} fillOpacity={0.9} />
                </g>
              )}
            </g>
          )
        })}
        <line x1={20} y1={158} x2={540} y2={158} stroke="rgba(255,255,255,0.07)" />
        <text x={20} y={180} fill="#7C8AA0" fontSize={10.5} fontFamily="JetBrains Mono">
          {p.archFlow}
        </text>
      </svg>
    </div>
  )
}

function TiltCard({ p, index }: { p: Project; index: number }) {
  const [mode, setMode] = useState<'ui' | 'arch'>('ui')
  const [t, setT] = useState({ rx: 0, ry: 0 })

  const chooseMode = (m: 'ui' | 'arch') => {
    setMode(m)
    window.dispatchEvent(new CustomEvent('view-mode', { detail: m }))
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onMouseMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`)
        el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`)
        setT({ rx: -py * 6, ry: px * 8 })
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      className="card holo flex flex-col rounded-2xl p-6 md:p-7"
      style={
        {
          transform: `perspective(1200px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          borderTop: `2px solid ${p.accent}`,
          '--holo': `${p.accent}24`
        } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono2 text-[9.5px] tracking-[0.22em] text-muted">{p.subtitle.toUpperCase()}</p>
          <h3 className="mt-1.5 font-display text-[1.4rem] font-semibold leading-tight tracking-tight text-ink">{p.title}</h3>
        </div>
        <span className="font-mono2 text-[11px] font-bold" style={{ color: p.accent }}>
          /0{index + 1}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line">
        {p.metrics.map((m, i) => (
          <div key={m.label} className={`py-3.5 ${i === 0 ? 'pr-3' : i === 2 ? 'pl-3' : 'px-3'} text-center`}>
            <div className="font-display text-lg font-bold tracking-tight" style={{ color: p.accent }}>
              {m.value}
            </div>
            <div className="mt-0.5 font-mono2 text-[8px] uppercase tracking-[0.16em] text-muted">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-6 border-b border-line">
        {(['ui', 'arch'] as const).map((m) => (
          <button
            key={m}
            onClick={() => chooseMode(m)}
            className={`-mb-px flex items-center gap-1.5 border-b-2 pb-3 font-mono2 text-[10px] tracking-[0.18em] transition ${
              mode === m ? 'text-white' : 'border-transparent text-muted hover:text-white'
            }`}
            style={mode === m ? { borderColor: p.accent } : undefined}
          >
            {m === 'ui' ? <LayoutGrid size={12} /> : <Network size={12} />}
            {m === 'ui' ? 'VIEW UI' : 'SYSTEM ARCHITECTURE'}
          </button>
        ))}
      </div>

      <div className="mt-5 min-h-[196px] flex-1">
        {mode === 'ui' ? (
          <ul className="space-y-3">
            {p.uiBullets.map((b) => (
              <li key={b} className="flex gap-3 text-[13.5px] leading-relaxed text-[#C6CFDC]">
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full" style={{ background: p.accent }} />
                {b}
              </li>
            ))}
            <li className="flex flex-wrap gap-1.5 pt-2">
              {p.stack.map((s) => (
                <span key={s} className="chip rounded-md px-2 py-0.5 font-mono2 text-[9.5px] text-muted">
                  {s}
                </span>
              ))}
            </li>
          </ul>
        ) : (
          <ArchSVG p={p} />
        )}
      </div>

      <button className="mt-5 flex items-center gap-1.5 border-t border-line pt-4 font-mono2 text-[10px] tracking-[0.2em] text-muted transition hover:text-cyanx">
        CASE STUDY <ExternalLink size={11} />
      </button>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <SectionHeading
          index="04"
          kicker="Dual-mode interactive case studies"
          title="Architecture"
          accent="showcase"
          desc="Three production systems. Toggle any card between the UI view and its live system architecture — the WebGL scene reacts to the mode you choose."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <TiltCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
