import { useRef, type MouseEvent, type ReactNode } from 'react'

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** D6 · Focus — element gravitates toward the cursor, springs back on leave. */
export function Magnetic({
  children,
  strength = 0.32,
  className = ''
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || reduceMotion()) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate3d(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px, 0)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`magnetic-8d ${className}`}
    >
      {children}
    </div>
  )
}

/** D5 · Tilt — perspective card tilt with cursor-tracked glare. */
export function Tilt({
  children,
  max = 9,
  className = ''
}: {
  children: ReactNode
  max?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || reduceMotion()) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateX(${(-ny * max * 2).toFixed(2)}deg) rotateY(${(nx * max * 2).toFixed(2)}deg)`
    el.style.setProperty('--glx', `${((nx + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--gly', `${((ny + 0.5) * 100).toFixed(1)}%`)
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div className={`tilt-wrap-8d ${className}`}>
      <div ref={ref} data-magnetic onMouseMove={onMove} onMouseLeave={reset} className="tilt-8d">
        {children}
      </div>
    </div>
  )
}
