import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { EXPERIENCES } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import { ScrollTrigger } from '../lib/gsap'

const ACCENTS = ['#FF3D3D', '#00E5FF', '#A78BFA']

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const hudBar = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  useLayoutEffect(() => {
    const section = ref.current
    if (!section) return
    const created: ScrollTrigger[] = []
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-station]'))

    cards.forEach((el, i) => {
      created.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 62%',
          end: 'bottom 42%',
          onToggle: (self) => {
            if (self.isActive) setActiveIdx(i)
          }
        })
      )
    })

    created.push(
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 75%',
        onUpdate: (self) => {
          if (hudBar.current) hudBar.current.style.transform = `scaleX(${self.progress.toFixed(3)})`
        }
      })
    )

    ScrollTrigger.refresh()
    return () => created.forEach((t) => t.kill())
  }, [])

  const active = EXPERIENCES[activeIdx]
  const activeAccent = ACCENTS[activeIdx % ACCENTS.length]
  const shortCompany = active.company.replace(/\s*\(.*\)\s*$/, '')

  return (
    <section id="timeline" ref={ref} className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <SectionHeading
          index="02"
          kicker="Scroll-driven camera flythrough"
          title="Career"
          accent="time-travel"
          desc="Each station is a career era. The WebGL camera flies the glowing Z-axis circuit as you scroll, and this HUD locks to the station in view."
        />

        <div className="sticky top-[72px] z-30 mb-12 flex justify-end">
          <div className="flex items-center gap-3 rounded-full border border-line bg-[#05070B]/85 py-2 pl-3.5 pr-3.5 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full" style={{ background: activeAccent, boxShadow: `0 0 10px ${activeAccent}` }} />
            <span className="font-mono2 text-[10px] tracking-[0.18em] text-ink">ST-0{active.station}</span>
            <span className="hidden font-mono2 text-[10px] tracking-[0.14em] text-muted sm:block">{shortCompany}</span>
            <span className="hidden font-mono2 text-[10px] text-muted md:block">{active.period}</span>
            <span className="block h-[3px] w-20 overflow-hidden rounded-full bg-white/10">
              <span ref={hudBar} className="block h-full w-full origin-left" style={{ background: activeAccent, transform: 'scaleX(0)' }} />
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-4 left-3 top-4 w-px bg-white/10 md:left-16">
            <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-rubysoft via-gold to-cyanx opacity-90" />
          </div>

          <div className="space-y-14 md:space-y-20">
            {EXPERIENCES.map((e, i) => {
              const accent = ACCENTS[i % ACCENTS.length]
              const isActive = activeIdx === i
              return (
                <motion.article
                  key={e.id}
                  data-station={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-12 md:pl-32"
                >
                  <span className="num absolute left-0 top-0 hidden text-6xl leading-none md:block">{`0${i + 1}`}</span>
                  <span
                    className="absolute left-[6px] top-2.5 h-3.5 w-3.5 rounded-full border-2 border-obsidian md:left-[57.5px]"
                    style={{ background: accent, boxShadow: isActive ? `0 0 16px ${accent}` : 'none', opacity: isActive ? 1 : 0.55 }}
                  />

                  <div className="mb-3 flex flex-wrap items-center gap-3 font-mono2 text-[10px] tracking-[0.2em]" style={{ color: accent }}>
                    <span>ST-0{e.station}</span>
                    <span className="h-px w-5" style={{ background: accent, opacity: 0.5 }} />
                    <span className="text-muted">Z-FLY {[-2, -10, -18][i]}</span>
                    <span className="text-muted md:hidden">· {e.period.toUpperCase()}</span>
                  </div>

                  <div
                    className={`card card-hover rounded-2xl p-6 md:p-7 ${isActive ? '' : ''}`}
                    style={{
                      borderTop: `2px solid ${accent}`,
                      boxShadow: isActive ? `0 0 0 1px ${accent}33, 0 24px 70px rgba(0,0,0,0.5)` : undefined
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-[1.5rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.7rem]">{e.role}</h3>
                        <p className="mt-1 text-[15px] font-medium" style={{ color: accent }}>
                          {e.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 font-mono2 text-[10px] text-muted">
                        <span className="flex items-center gap-1.5"><Calendar size={11} /> {e.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={11} /> {e.location}</span>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[14px] leading-relaxed text-[#C6CFDC]">
                          <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => (
                        <span key={s} className="chip rounded-md px-2.5 py-1 font-mono2 text-[10px] text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3 border-t border-line pt-6 font-mono2 text-[10px] tracking-[0.2em] text-muted">
          <Briefcase size={12} className="text-cyanx" /> 2023 → 2026 · CONTINUOUS PRODUCTION DELIVERY · DHAKA + REMOTE
        </div>
      </div>
    </section>
  )
}
