import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, Globe, Download, Send, CheckCircle2, FileText } from 'lucide-react'
import { PROFILE } from '../data/portfolio'
import { downloadATSResume, printResume } from '../utils/resume'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'recruiter'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="orb left-[8%] top-[12%] h-[340px] w-[340px] bg-ruby/12" />
      <div className="orb right-[4%] top-[44%] h-[320px] w-[320px] bg-cyanx/10" />
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <SectionHeading
          index="07"
          kicker="Contact portal · open channel"
          title="Initialize"
          accent="handshake"
          desc="Replies within 24 hours. Direct channels below, or open your mail client with the form on the right."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card rounded-2xl p-7 md:p-8"
          >
            <div className="flex items-center gap-3.5">
              <img
                src="/shiboshree.png"
                alt="Shiboshree Roy"
                width={44}
                height={44}
                loading="lazy"
                className="h-11 w-11 rounded-full border border-line object-cover"
              />
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">Direct channels</h3>
                <p className="mt-0.5 font-mono2 text-[10px] tracking-[0.14em] text-muted">SHIBOSHREE ROY · REPLIES WITHIN 24H</p>
              </div>
            </div>
            <div className="mt-6 divide-y divide-line border-y border-line">
              <a href={`mailto:${PROFILE.email}`} className="group flex items-center justify-between gap-4 py-5">
                <span className="flex items-center gap-3.5">
                  <Mail size={16} className="shrink-0 text-rubysoft" />
                  <span className="text-[15px] font-medium text-ink">{PROFILE.email}</span>
                </span>
                <span className="font-mono2 text-[10px] tracking-[0.18em] text-muted transition group-hover:text-cyanx">MAIL ↗</span>
              </a>
              <a href={PROFILE.phoneHref} className="group flex items-center justify-between gap-4 py-5">
                <span className="flex items-center gap-3.5">
                  <Phone size={16} className="shrink-0 text-cyanx" />
                  <span className="text-[15px] font-medium text-ink">{PROFILE.phone}</span>
                </span>
                <span className="font-mono2 text-[10px] tracking-[0.18em] text-muted transition group-hover:text-cyanx">CALL ↗</span>
              </a>
              <div className="grid grid-cols-3 gap-2 py-5">
                {[
                  { icon: <Github size={15} />, href: PROFILE.links.github, label: 'GITHUB' },
                  { icon: <Linkedin size={15} />, href: PROFILE.links.linkedin, label: 'LINKEDIN' },
                  { icon: <Globe size={15} />, href: PROFILE.links.portfolio, label: 'SITE' }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="chip flex items-center justify-center gap-2 rounded-xl py-3 font-mono2 text-[10px] tracking-[0.14em] text-ink transition hover:border-white/25"
                  >
                    {s.icon}
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              <button onClick={printResume} className="btn-primary justify-center px-5 py-3.5 font-display text-sm">
                <FileText size={15} /> Résumé → PDF
              </button>
              <button onClick={downloadATSResume} className="btn-ghost justify-center px-5 py-3.5 font-display text-sm">
                <Download size={15} className="text-cyanx" /> ATS Plain Text
              </button>
            </div>
            <p className="mt-4 font-mono2 text-[10px] leading-relaxed text-muted">
              PDF opens the print dialog (Ctrl/Cmd + P → Save as PDF). TXT is parsed verbatim by ATS software.
            </p>
            <p className="mt-3 font-mono2 text-[10px] tracking-[0.16em] text-muted">
              BASED IN {PROFILE.location.toUpperCase()} · OPEN TO REMOTE + ONSITE
            </p>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="card rounded-2xl p-7 md:p-8"
          >
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">Transmit message</h3>
            <p className="mt-1.5 font-mono2 text-[10.5px] text-muted">Opens your mail client, pre-addressed to Shiboshree.</p>

            <label className="mt-6 block">
              <span className="font-mono2 text-[10px] tracking-[0.2em] text-muted">YOUR NAME</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Recruiter"
                className="mt-2 w-full rounded-xl border border-line bg-black/30 px-4 py-3 text-sm text-ink outline-none transition focus:border-cyanx/50 placeholder:text-muted/50"
              />
            </label>
            <label className="mt-5 block">
              <span className="font-mono2 text-[10px] tracking-[0.2em] text-muted">YOUR EMAIL</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                className="mt-2 w-full rounded-xl border border-line bg-black/30 px-4 py-3 text-sm text-ink outline-none transition focus:border-cyanx/50 placeholder:text-muted/50"
              />
            </label>
            <label className="mt-5 block">
              <span className="font-mono2 text-[10px] tracking-[0.2em] text-muted">PAYLOAD</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Hi Shiboshree — we have a Senior Rails role…"
                className="mt-2 w-full resize-none rounded-xl border border-line bg-black/30 px-4 py-3 text-sm text-ink outline-none transition focus:border-cyanx/50 placeholder:text-muted/50"
              />
            </label>
            <button type="submit" className="btn-primary mt-6 w-full justify-center px-5 py-3.5 font-display text-sm">
              {sent ? (
                <>
                  <CheckCircle2 size={16} /> TRANSMITTED — CHECK MAIL APP
                </>
              ) : (
                <>
                  <Send size={15} /> SEND VIA MAILTO
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
