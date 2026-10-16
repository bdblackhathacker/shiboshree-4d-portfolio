import { motion } from 'framer-motion'
import { GraduationCap, BadgeCheck, Award } from 'lucide-react'
import { EDUCATION, CERTS } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" className="relative py-20 md:py-24">
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <SectionHeading
          index="06"
          kicker="Academic base & verified practice"
          title="Education &"
          accent="certifications"
          desc="Systems-first foundation applied daily in schema design, query tuning, and production delivery."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card rounded-2xl p-7 md:p-8"
            style={{ borderTop: '2px solid #00E5FF' }}
          >
            <p className="kicker flex items-center gap-2">
              <GraduationCap size={14} /> EDUCATION
            </p>
            <h3 className="mt-4 font-display text-[1.55rem] font-semibold leading-snug tracking-tight text-ink">{EDUCATION.degree}</h3>
            <p className="mt-1.5 text-[15px] text-muted">{EDUCATION.school}</p>
            <div className="mt-6 flex items-center gap-4 border-y border-line py-4">
              <Award size={16} className="text-emerald-300" />
              <span className="font-display text-2xl font-bold tracking-tight text-ink">{EDUCATION.gpa}</span>
              <span className="font-mono2 text-[10px] tracking-[0.2em] text-muted">CUMULATIVE GPA</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#C6CFDC]">
              Data structures, DBMS, OOP, networking and web engineering — the fundamentals behind every Rails schema and
              optimized query in production.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="card rounded-2xl p-7 md:p-8"
            style={{ borderTop: '2px solid #FF3D3D' }}
          >
            <p className="kicker flex items-center gap-2">
              <BadgeCheck size={14} /> CERTIFICATIONS
            </p>
            <ul className="mt-5 divide-y divide-line">
              {CERTS.map((c, i) => (
                <li key={c} className="flex items-center gap-4 py-4 first:pt-1 last:pb-1">
                  <span className="font-mono2 text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 0 ? '#FF3D3D' : i === 1 ? '#00E5FF' : '#A78BFA' }} />
                  <span className="font-display text-[15px] font-semibold tracking-tight text-ink">{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono2 text-[10.5px] leading-relaxed text-muted">
              verified practice · Rails 7 · Hotwire · RSpec · PostgreSQL tuning
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
