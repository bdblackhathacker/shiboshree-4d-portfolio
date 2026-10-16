import { useEffect, useRef } from 'react'

/**
 * D6 · Focus — ambient cursor aura + reactive tracking ring + click ripples.
 * Native cursor stays intact; this is pure atmosphere (fine pointers only).
 */
export default function CursorSystem() {
  const aura = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let ax = window.innerWidth / 2
    let ay = window.innerHeight / 2
    let rx = ax
    let ry = ay
    let mx = ax
    let my = ay
    let scale = 1
    let targetScale = 1

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      const t = (e.target as HTMLElement).closest?.('a, button, [data-magnetic]')
      targetScale = t ? 2.1 : 1
    }
    const onDown = (e: PointerEvent) => {
      const s = document.createElement('span')
      s.className = 'ripple-8d'
      s.style.left = `${e.clientX}px`
      s.style.top = `${e.clientY}px`
      document.body.appendChild(s)
      window.setTimeout(() => s.remove(), 700)
    }
    const loop = () => {
      ax += (mx - ax) * 0.06
      ay += (my - ay) * 0.06
      rx += (mx - rx) * 0.22
      ry += (my - ry) * 0.22
      scale += (targetScale - scale) * 0.18
      if (aura.current) {
        aura.current.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0) translate(-50%, -50%)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return (
    <div aria-hidden>
      <div ref={aura} className="cursor-aura-8d" />
      <div ref={ring} className="cursor-ring-8d" />
    </div>
  )
}
