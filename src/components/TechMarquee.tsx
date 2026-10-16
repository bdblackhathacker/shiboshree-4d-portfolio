const ITEMS = [
  'RUBY ON RAILS 7',
  'POSTGRESQL TUNING',
  'HOTWIRE · TURBO · STIMULUS',
  'REACT + TYPESCRIPT',
  'SIDEKIQ · REDIS',
  'REST · JWT · DEVISE',
  'DOCKER · RENDER · AWS',
  'TAILWIND SYSTEMS'
]

export default function TechMarquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-line bg-[#05070B]/70 py-3.5 backdrop-blur">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-mono2 text-[10px] tracking-[0.3em]">
            <span className={i % 3 === 1 ? 'text-cyanx/80' : 'text-muted'}>{t}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
          </span>
        ))}
      </div>
    </div>
  )
}
