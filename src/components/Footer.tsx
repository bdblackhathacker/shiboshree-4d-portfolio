import { useEffect, useRef } from 'react'
import { PROFILE } from '../data/portfolio'

export default function Footer({ velocity }: { velocity: number }) {
  const fpsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    let frames = 0
    let last = performance.now()
    const loop = (now: number) => {
      frames++
      if (now - last >= 1000) {
        if (fpsRef.current) fpsRef.current.textContent = String(frames)
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <footer className="border-t border-white/10 bg-black/50 py-8 pb-24 backdrop-blur lg:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <p className="font-mono2 text-[11px] text-mist">
          © 2026 {PROFILE.name} · BUILT WITH RAILS-MIND + REACT-BODY · <span className="text-cyanx">4D CORE v3.0</span>
        </p>
        <p className="font-mono2 text-[11px] text-mist">
          SCROLL-VELOCITY <span className="text-rubysoft">{velocity.toFixed(2)}×</span> · RENDER{' '}
          <span className="text-emerald-300">
            <span ref={fpsRef}>--</span> FPS LIVE
          </span>
        </p>
      </div>
    </footer>
  )
}
