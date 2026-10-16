import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DIMS = [
  'D1 · X LATERAL',
  'D2 · Y VERTICAL',
  'D3 · Z DEPTH',
  'D4 · T TIME',
  'D5 · TILT GYRO',
  'D6 · FOCUS',
  'D7 · SPECTRUM',
  'D8 · FIELD'
]

/** Boot sequence — lights up all 8 dimensions, then lifts away. Click to skip. */
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const DUR = 1500
    let raf = 0
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      setProgress(100)
      window.setTimeout(() => {
        setDone(true)
        document.body.style.overflow = prev
      }, 280)
    }
    const tick = (now: number) => {
      const k = Math.min((now - start) / DUR, 1)
      setProgress(Math.round((1 - Math.pow(1 - k, 3)) * 100))
      if (k < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      finished = true
      document.body.style.overflow = prev
    }
  }, [])

  const lit = Math.min(8, Math.floor((progress / 100) * 8) + (progress > 4 ? 1 : 0))

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setDone(true)}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-8 bg-obsidian px-6"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="text-center">
            <div className="font-mono2 text-[10px] tracking-[0.34em] text-cyanx">INITIALIZING 8-DIMENSION DRIVE</div>
            <div className="mt-3 font-display text-6xl font-bold tabular-nums tracking-tight text-ink md:text-7xl">
              {progress}
              <span className="text-rubysoft">%</span>
            </div>
          </div>
          <div className="h-px w-64 overflow-hidden bg-white/10 md:w-96">
            <div
              className="h-full bg-gradient-to-r from-ruby via-gold to-cyanx transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-4">
            {DIMS.map((d, i) => (
              <div
                key={d}
                className={`font-mono2 text-[9px] tracking-[0.18em] transition-colors duration-300 ${
                  i < lit ? 'text-cyanx' : 'text-white/25'
                }`}
              >
                <span className={`mr-1.5 inline-block h-1 w-1 rounded-full ${i < lit ? 'bg-cyanx' : 'bg-white/20'}`} />
                {d}
              </div>
            ))}
          </div>
          <div className="font-mono2 text-[9px] tracking-[0.28em] text-muted">CLICK TO SKIP</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
