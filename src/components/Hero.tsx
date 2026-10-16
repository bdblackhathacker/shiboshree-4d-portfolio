import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { PROFILE } from '../data/portfolio'
import { printResume } from '../utils/resume'
import Terminal from './Terminal'

const METRICS: [string, string][] = [
  ['3+', 'Years shipping production'],
  ['3', 'Enterprise roles'],
  ['39', 'Tech competencies'],
  ['60', 'FPS performance floor']
]

export default function Hero({ velocity }: { velocity: number }) {
  const energy = Math.min(velocity, 3)
  const [clock, setClock] = useState('--:--')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="orb left-[-180px] top-[8%] h-[420px] w-[420px] bg-ruby/15" />
      <div className="orb right-[-160px] top-[36%] h-[440px] w-[440px] bg-cyanx/10" />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5"
        >
          <span className="flex items-center gap-2.5 font-mono2 text-[10px] tracking-[0.24em] text-muted">
            <span className="text-cyanx">01</span>
            <span className="h-px w-4 bg-white/20" />
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            AVAILABLE FOR FULL-TIME &amp; CONTRACT
          </span>
          <span className="flex items-center gap-4 font-mono2 text-[10px] tracking-[0.24em] text-muted">
            <span>DHAKA {clock} <span className="text-cyanx">GMT+6</span></span>
            <span className="hidden sm:block">SCROLL = TIME {energy > 0.6 && <span className="text-rubysoft">· {energy.toFixed(1)}×</span>}</span>
          </span>
        </motion.div>

        <div className="grid gap-12 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="font-display font-bold leading-[0.92] tracking-[-0.035em]"
            >
              <span className="block text-[15.5vw] text-ink sm:text-7xl md:text-[5.4rem] xl:text-[6.6rem]">SHIBOSHREE</span>
              <span className="gradient-text block pb-1 text-[15.5vw] sm:text-7xl md:text-[5.4rem] xl:text-[6.6rem]">ROY</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mt-6 flex items-center gap-4"
            >
              <span className="h-px w-10 shrink-0 bg-gradient-to-r from-ruby to-cyanx" />
              <p className="font-mono2 text-[10.5px] tracking-[0.26em] text-muted md:text-[11px]">
                FULL-STACK SOFTWARE ENGINEER <span className="text-cyanx">/</span> RUBY ON RAILS DEVELOPER
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.6 }}
              className="mt-6 max-w-xl font-display text-xl leading-snug text-ink md:text-[1.6rem]"
            >
              Architecting scalable backend systems &amp; reactive frontends.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.6 }}
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted"
            >
              Rails · PostgreSQL · Hotwire · React · TypeScript. Production-grade delivery with RESTful API design,
              authentication/authorization, and database architecture tuned for scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className="btn-primary group px-6 py-3.5 font-display text-sm">
                View Case Studies <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </a>
              <button onClick={printResume} className="btn-ghost px-6 py-3.5 font-display text-sm">
                <FileText size={15} className="text-cyanx" /> Résumé → PDF
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.58, duration: 0.6 }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono2 text-[11px]"
            >
              {[
                { label: 'GITHUB', href: PROFILE.links.github },
                { label: 'LINKEDIN', href: PROFILE.links.linkedin },
                { label: 'EMAIL', href: `mailto:${PROFILE.email}` },
                { label: 'PHONE', href: PROFILE.phoneHref }
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 tracking-[0.18em] text-muted transition hover:text-cyanx"
                >
                  {l.label}
                  <span className="transition group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.75 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[430px]">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-ruby/20 via-transparent to-cyanx/20 blur-2xl" aria-hidden />
                <div className="card relative overflow-hidden rounded-2xl" style={{ borderTop: '2px solid #E10600' }}>
                  <div className="relative aspect-square">
                    <img
                      src="/shiboshree.png"
                      alt="Shiboshree Roy — Full-Stack Software Engineer"
                      width={400}
                      height={400}
                      loading="eager"
                      className="h-full w-full object-cover grayscale transition duration-700 hover:scale-[1.03] hover:grayscale-0"
                    />
                    <span className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 border-l-2 border-t-2 border-cyanx/70" aria-hidden />
                    <span className="absolute right-3.5 top-3.5 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-black/65 px-2.5 py-1 font-mono2 text-[9px] tracking-[0.16em] text-emerald-300 backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> OPEN TO WORK
                    </span>
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" aria-hidden />
                  </div>
                </div>
              </div>

              <div className="relative z-10 -mt-6">
                <Terminal />
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line px-1 pt-3 font-mono2 text-[9.5px] tracking-[0.2em] text-muted">
                <span>SHIBOSHREE ROY · DHAKA, BD · GMT+6</span>
                <span className="text-cyanx">
                  RENDER · {energy > 1 ? 'KINETIC BOOST' : 'STABLE 60FPS'} · Z-CAM {(9 - Math.min(velocity, 1) * 2).toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.66, duration: 0.6 }}
          className="mt-14 grid grid-cols-2 divide-x divide-line border-y border-line md:grid-cols-4"
        >
          {METRICS.map(([v, l], i) => (
            <div key={l} className={`px-5 py-6 ${i > 1 ? 'border-t border-line md:border-t-0' : ''}`}>
              <div className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {v}
                <span className="text-rubysoft">.</span>
              </div>
              <div className="mt-1.5 font-mono2 text-[9.5px] uppercase tracking-[0.2em] text-muted">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
