import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, ArrowUpRight } from 'lucide-react'
import { PROFILE } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import SkillIcon, { hasIcon } from './SkillIcon'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
}

const LANG_COLORS: Record<string, string> = {
  Ruby: '#FF3D3D',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  HTML: '#E34C26',
  CSS: '#563D7C',
  'C++': '#F34B7D',
  C: '#8B949E',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Java: '#B07219',
  PHP: '#4F5D95',
  Shell: '#89E051',
  Kotlin: '#A97BFF',
  Swift: '#F05138'
}

function ago(iso: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86400000))
  if (days === 0) return 'today'
  if (days === 1) return '1d ago'
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  return `${months}mo ago`
}

export default function GitHubStrip() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const ac = new AbortController()
    fetch(`https://api.github.com/users/${PROFILE.links.githubUser}/repos?sort=pushed&per_page=30`, {
      signal: ac.signal,
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then((r) => {
        if (!r.ok) throw new Error(`github ${r.status}`)
        return r.json() as Promise<Repo[]>
      })
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        )
        setRepos(sorted.slice(0, 6))
      })
      .catch((e: unknown) => {
        if ((e as Error).name !== 'AbortError') setFailed(true)
      })
    return () => ac.abort()
  }, [])

  if (failed) return null

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <SectionHeading
          index="05"
          kicker="Live from the GitHub API"
          title="Open source"
          accent="& shipped repos"
          desc="Pulled in real time from GitHub — most-starred and most recently pushed public repositories."
        />

        {repos === null ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card animate-pulse rounded-2xl p-5">
                <div className="h-4 w-2/3 rounded bg-white/[0.07]" />
                <div className="mt-3 h-3 w-full rounded bg-white/[0.05]" />
                <div className="mt-2 h-3 w-4/5 rounded bg-white/[0.05]" />
                <div className="mt-6 h-3 w-1/3 rounded bg-white/[0.05]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => (
              <motion.a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="card card-hover group flex flex-col rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 truncate font-mono2 text-[13px] font-bold text-ink">{r.name}</h3>
                  <ArrowUpRight size={14} className="shrink-0 text-muted transition group-hover:text-cyanx" />
                </div>
                <p className="mt-2.5 line-clamp-2 min-h-[36px] text-[12.5px] leading-relaxed text-[#C6CFDC]">
                  {r.description ?? 'No description provided.'}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 font-mono2 text-[10px] text-muted">
                  <span className="flex min-w-0 items-center gap-1.5">
                    {r.language && hasIcon(r.language) ? (
                      <SkillIcon name={r.language} size={11} />
                    ) : (
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.language ? LANG_COLORS[r.language] ?? '#8B949E' : '#8B949E' }} />
                    )}
                    <span className="truncate">{r.language ?? 'Code'}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="flex items-center gap-1"><Star size={10} /> {r.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={10} /> {r.forks_count}</span>
                    <span>{ago(r.pushed_at)}</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href={`${PROFILE.links.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost px-5 py-3 font-mono2 text-[11px] tracking-[0.14em]"
          >
            VIEW ALL REPOSITORIES ↗
          </a>
        </div>
      </div>
    </section>
  )
}
