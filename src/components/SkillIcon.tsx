import {
  siAngular,
  siBootstrap,
  siC,
  siCplusplus,
  siCss,
  siDotnet,
  siDocker,
  siGit,
  siGnubash,
  siGo,
  siGraphql,
  siHtml5,
  siHotwire,
  siJavascript,
  siJsonwebtokens,
  siKubernetes,
  siMysql,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRender,
  siRuby,
  siRubyonrails,
  siRust,
  siSass,
  siSidekiq,
  siSonarqubeserver,
  siSqlite,
  siStimulus,
  siTailwindcss,
  siTurbo,
  siTypescript
} from 'simple-icons'
import { Boxes, Braces, Cloud, Database, FileCode2, Layers, ShieldCheck, type LucideIcon } from 'lucide-react'

type BrandIcon = { title: string; hex: string; path: string }
type Entry = { kind: 'brand'; icon: BrandIcon } | { kind: 'lucide'; Icon: LucideIcon; tint?: string }

/** Brand colors that are too dark for the obsidian theme get a readable variant. */
const TINT: Record<string, string> = {
  Rust: '#DEA584',
  Java: '#F89820',
  JWT: '#FB015B',
  Render: '#46E3B7',
  AngularJS: '#DD0031',
  AWS: '#FF9900'
}

const MAP: Record<string, Entry> = {
  Ruby: { kind: 'brand', icon: siRuby },
  JavaScript: { kind: 'brand', icon: siJavascript },
  TypeScript: { kind: 'brand', icon: siTypescript },
  Python: { kind: 'brand', icon: siPython },
  PHP: { kind: 'brand', icon: siPhp },
  C: { kind: 'brand', icon: siC },
  'C++': { kind: 'brand', icon: siCplusplus },
  Java: { kind: 'brand', icon: siOpenjdk },
  Go: { kind: 'brand', icon: siGo },
  Rust: { kind: 'brand', icon: siRust },
  'Ruby on Rails': { kind: 'brand', icon: siRubyonrails },
  'ASP.NET': { kind: 'brand', icon: siDotnet },
  JWT: { kind: 'brand', icon: siJsonwebtokens },
  GraphQL: { kind: 'brand', icon: siGraphql },
  Hotwire: { kind: 'brand', icon: siHotwire },
  Turbo: { kind: 'brand', icon: siTurbo },
  'Stimulus.js': { kind: 'brand', icon: siStimulus },
  React: { kind: 'brand', icon: siReact },
  AngularJS: { kind: 'brand', icon: siAngular },
  'Tailwind CSS': { kind: 'brand', icon: siTailwindcss },
  Bootstrap: { kind: 'brand', icon: siBootstrap },
  SCSS: { kind: 'brand', icon: siSass },
  PostgreSQL: { kind: 'brand', icon: siPostgresql },
  MySQL: { kind: 'brand', icon: siMysql },
  SQLite: { kind: 'brand', icon: siSqlite },
  Redis: { kind: 'brand', icon: siRedis },
  Sidekiq: { kind: 'brand', icon: siSidekiq },
  Docker: { kind: 'brand', icon: siDocker },
  Kubernetes: { kind: 'brand', icon: siKubernetes },
  Render: { kind: 'brand', icon: siRender },
  Git: { kind: 'brand', icon: siGit },
  SonarQube: { kind: 'brand', icon: siSonarqubeserver },
  HTML: { kind: 'brand', icon: siHtml5 },
  HTML5: { kind: 'brand', icon: siHtml5 },
  CSS: { kind: 'brand', icon: siCss },
  Shell: { kind: 'brand', icon: siGnubash },
  Bash: { kind: 'brand', icon: siGnubash },
  Dockerfile: { kind: 'brand', icon: siDocker },
  AWS: { kind: 'lucide', Icon: Cloud, tint: TINT.AWS },
  'RESTful APIs': { kind: 'lucide', Icon: Braces },
  MVC: { kind: 'lucide', Icon: Layers },
  'Active Record': { kind: 'lucide', Icon: Database },
  Devise: { kind: 'lucide', Icon: ShieldCheck },
  Microservices: { kind: 'lucide', Icon: Boxes },
  HAML: { kind: 'lucide', Icon: FileCode2 }
}

/** Project stack labels → skill names. */
const ALIAS: Record<string, string> = {
  Rails: 'Ruby on Rails',
  'Rails 7': 'Ruby on Rails',
  'Rails API': 'Ruby on Rails',
  Tailwind: 'Tailwind CSS',
  Stimulus: 'Stimulus.js'
}

function readable(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16)
  let r = (n >> 16) & 255
  let g = (n >> 8) & 255
  let b = n & 255
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (lum < 0.28) {
    const t = 0.62
    r = Math.round(r + (255 - r) * t)
    g = Math.round(g + (255 - g) * t)
    b = Math.round(b + (255 - b) * t)
  }
  return `rgb(${r}, ${g}, ${b})`
}

/** True when a branded icon exists for this label (used for graceful fallbacks). */
export function hasIcon(name: string) {
  return Boolean(MAP[ALIAS[name] ?? name])
}

export default function SkillIcon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const key = ALIAS[name] ?? name
  const entry = MAP[key]
  if (!entry) return <Braces size={size} className={`text-cyanx/80 ${className}`} aria-hidden />
  if (entry.kind === 'lucide') {
    const Icon = entry.Icon
    return <Icon size={size} className={className} style={entry.tint ? { color: entry.tint } : undefined} aria-hidden />
  }
  const color = TINT[key] ?? readable(`#${entry.icon.hex}`)
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      <title>{entry.icon.title}</title>
      <path d={entry.icon.path} fill={color} />
    </svg>
  )
}
