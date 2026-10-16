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

const HALF: (string | null)[] = [null, ...ITEMS]

export default function TechMarquee() {
  const row = [...HALF, ...HALF]
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-line bg-[#05070B]/70 py-3.5 backdrop-blur">
      <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((t, i) =>
          t === null ? (
            <span key={i} className="block w-56 shrink-0" aria-hidden="true" />
          ) : (
            <span key={i} className="flex items-center gap-10 pr-10 font-mono2 text-[10px] tracking-[0.3em]">
              <span className={i % 3 === 1 ? 'text-cyanx/80' : 'text-muted'}>{t}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
            </span>
          )
        )}
      </div>
    </div>
  )
}
