import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { SKILLS, type SkillCategory } from '../data/portfolio'
import SectionHeading from './SectionHeading'

const CATS: (SkillCategory | 'All')[] = ['All', 'Languages', 'Backend & Architecture', 'Frontend', 'Databases & DevOps']
const COLORS: Record<string, string> = {
  Languages: '#00E5FF',
  'Backend & Architecture': '#FF3D3D',
  Frontend: '#A78BFA',
  'Databases & DevOps': '#34D399'
}

export default function Skills() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All')
  const [q, setQ] = useState('')
  const [active, setActive] = useState<string | null>('Ruby on Rails')

  const entries = useMemo(
    () =>
      (Object.entries(SKILLS) as [SkillCategory, { name: string; level: number; desc: string }[]][]).flatMap(([c, arr]) =>
        arr.map((s) => ({ ...s, cat: c }))
      ),
    []
  )

  const nodes = useMemo(
    () =>
      entries.filter(
        (s) => (cat === 'All' || s.cat === cat) && (q.trim() === '' || s.name.toLowerCase().includes(q.toLowerCase()))
      ),
    [entries, cat, q]
  )

  const detail = useMemo(() => entries.find((s) => s.name === active) ?? null, [entries, active])

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <SectionHeading
          index="03"
          kicker="Filterable node constellation"
          title="Skill"
          accent="matrix"
          desc="39 competencies mapped across four engineering planes. Filter, search, or click any node for depth data."
        />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-line bg-white/[0.02] p-1">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-lg px-3.5 py-2 font-mono2 text-[10px] tracking-[0.14em] transition ${
                  cat === c ? 'bg-white text-[#05070B]' : 'text-muted hover:text-white'
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-2 rounded-xl border border-line bg-white/[0.02] px-4 py-2.5 lg:w-72">
            <Search size={14} className="shrink-0 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 39 nodes…"
              className="w-full bg-transparent font-mono2 text-[11px] text-ink outline-none placeholder:text-muted/60"
            />
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {nodes.map((s) => {
                const color = COLORS[s.cat]
                const isActive = active === s.name
                return (
                  <button
                    key={s.name}
                    onClick={() => setActive(s.name)}
                    className="card card-hover rounded-xl p-4 text-left"
                    style={isActive ? { borderColor: `${color}88`, background: `linear-gradient(180deg, ${color}14, rgba(255,255,255,0)), #0A0E15` } : undefined}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                        <span className="truncate font-display text-[14.5px] font-semibold tracking-tight text-ink">{s.name}</span>
                      </span>
                      <span className="font-mono2 text-[10px] text-muted">{s.level}%</span>
                    </div>
                    <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
                      <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: color }} />
                    </div>
                    <p className="mt-2 truncate font-mono2 text-[9.5px] tracking-[0.14em] text-muted/80">{s.cat.toUpperCase()}</p>
                  </button>
                )
              })}
            </div>
            {nodes.length === 0 && (
              <div className="card flex flex-col items-center gap-2 rounded-2xl py-20">
                <p className="font-mono2 text-[12px] text-muted">no nodes match — clear the search.</p>
                <button onClick={() => { setQ(''); setCat('All') }} className="font-mono2 text-[11px] text-cyanx hover:underline">
                  reset filters
                </button>
              </div>
            )}
          </motion.div>

          <aside className="card rounded-2xl p-6 lg:sticky lg:top-24">
            <p className="kicker">Node inspector</p>
            {detail ? (
              <div key={detail.name}>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{detail.name}</h3>
                <p className="mt-1 font-mono2 text-[10px] tracking-[0.2em]" style={{ color: COLORS[detail.cat] }}>
                  {detail.cat.toUpperCase()}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#C6CFDC]">{detail.desc}</p>
                <div className="mt-5">
                  <div className="flex justify-between font-mono2 text-[10px] text-muted">
                    <span>PROFICIENCY</span>
                    <span>{detail.level}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${detail.level}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${COLORS[detail.cat]}, rgba(255,255,255,0.35))` }}
                    />
                  </div>
                </div>
                <div className="mt-5 rounded-xl border border-line bg-black/40 p-3.5 font-mono2 text-[10.5px] leading-relaxed text-emerald-300/90">
                  {JSON.stringify({ skill: detail.name, level: detail.level, plane: detail.cat }, null, 2)}
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">Select a node to inspect it.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
