import { useEffect, useState } from 'react'

function readVar(name: string, fallback = '0') {
  if (typeof window === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

/** Live readout of all 8 dimensions. Toggle with the 8D button or the "8" key. */
export default function DimensionHUD({ lowPower }: { lowPower: boolean }) {
  const [open, setOpen] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 1024
  )
  const [tick, setTick] = useState(0)
  const [focus, setFocus] = useState('BODY')
  const [fps, setFps] = useState(60)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (e.key === '8' && !e.metaKey && !e.ctrlKey && !el?.closest?.('input, textarea')) {
        setOpen((v) => !v)
      }
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el || !el.tagName) return
      setFocus(`${el.tagName}${el.id ? `#${el.id}` : ''}`.slice(0, 18).toUpperCase())
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mouseover', onOver, { passive: true })
    const id = window.setInterval(() => setTick((t) => t + 1), 300)

    let raf = 0
    let last = performance.now()
    let ema = 60
    const loop = (now: number) => {
      const dt = now - last
      last = now
      if (dt > 0) ema += (1000 / dt - ema) * 0.06
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    const fpsId = window.setInterval(() => setFps(Math.round(ema)), 600)
    void tick

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mouseover', onOver)
      window.clearInterval(id)
      window.clearInterval(fpsId)
      cancelAnimationFrame(raf)
    }
  }, [])

  const mx = parseFloat(readVar('--mx', '0.5'))
  const my = parseFloat(readVar('--my', '0.5'))
  const scroll = parseFloat(readVar('--scroll', '0'))
  const vel = parseFloat(readVar('--vel', '0'))
  const hue = parseFloat(readVar('--hue', '190'))
  const tx = readVar('--tx', '0')
  const ty = readVar('--ty', '0')
  const depth = 9 - scroll * 23

  return (
    <div className="fixed bottom-20 left-3 z-40 sm:bottom-6 sm:left-6">
      {open && (
        <div className="glass-strong w-52 overflow-hidden rounded-xl font-mono2 text-[9.5px] tracking-[0.14em]">
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-between border-b border-line px-3 py-2 text-muted transition hover:text-ink"
          >
            <span className="text-cyanx">◈ 8D TELEMETRY</span>
            <span>[—]</span>
          </button>
          <div className="space-y-1.5 px-3 py-2.5 text-muted">
            <Row k="D1·X" v={`${(mx * 100).toFixed(0)}%`} bar={mx} />
            <Row k="D2·Y" v={`${(my * 100).toFixed(0)}%`} bar={my} />
            <Row k="D3·Z" v={`${depth.toFixed(1)}m`} bar={scroll} />
            <Row k="D4·T" v={`${vel.toFixed(1)}×`} bar={Math.min(vel / 3, 1)} hot={vel > 0.8} />
            <Row k="D5·TILT" v={`${tx}/${ty}`} />
            <Row k="D6·FOCUS" v={focus} />
            <Row
              k="D7·HUE"
              v={`${Math.round(hue)}°`}
              dot={`hsl(${Math.round(hue)}, 100%, 62%)`}
            />
            <Row k="D8·FIELD" v={`${fps}FPS${lowPower ? '·ECO' : ''}`} bar={Math.min(fps / 120, 1)} />
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        title='Toggle 8D telemetry (press "8")'
        aria-label="Toggle 8D telemetry"
        className={`mt-2 flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono2 text-[10px] tracking-[0.2em] backdrop-blur transition ${
          open
            ? 'border-cyanx/40 bg-cyanx/10 text-cyanx'
            : 'border-line bg-black/60 text-muted hover:border-white/20 hover:text-ink'
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${open ? 'animate-pulse bg-cyanx' : 'bg-white/30'}`} />
        8D
      </button>
    </div>
  )
}

function Row({
  k,
  v,
  bar,
  dot,
  hot
}: {
  k: string
  v: string
  bar?: number
  dot?: string
  hot?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-white/40">{k}</span>
      <span className={`flex items-center gap-1.5 truncate ${hot ? 'text-rubysoft' : 'text-ink'}`}>
        {dot && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dot }} />}
        <span className="truncate">{v}</span>
      </span>
      {bar !== undefined && (
        <span className="hidden h-px w-10 shrink-0 bg-white/10">
          <span className="block h-full bg-cyanx/80" style={{ width: `${Math.round(bar * 100)}%` }} />
        </span>
      )}
    </div>
  )
}
