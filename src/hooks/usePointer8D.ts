import { useEffect } from 'react'

/**
 * 8D dimension tracker — feeds the whole design system through CSS vars:
 *  D1 --mx/--px  pointer X (0..1 / -1..1)
 *  D2 --my/--py  pointer Y
 *  D3 --scroll   scroll depth (0..1)
 *  D4 --vel      scroll velocity / kinetic energy
 *  D5 --tx/--ty  device tilt (gyro, -1..1)
 *  D7 --hue      scroll-driven spectrum (190deg → 360deg)
 */
export function usePointer8D() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let px = 0.5
    let py = 0.5
    let tx = 0
    let ty = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let vel = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      px = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1)
      py = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1)
    }
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      tx = Math.min(Math.max(e.gamma / 45, -1), 1)
      ty = Math.min(Math.max((e.beta - 45) / 45, -1), 1)
    }

    const loop = () => {
      const y = window.scrollY
      const t = performance.now()
      const dt = Math.max((t - lastT) / 1000, 0.016)
      const max = document.documentElement.scrollHeight - window.innerHeight || 1
      const scroll = Math.min(Math.max(y / max, 0), 1)
      const inst = Math.min(Math.abs(y - lastY) / (dt * 900), 4)
      vel += (inst - vel) * 0.1
      lastY = y
      lastT = t

      root.style.setProperty('--mx', px.toFixed(4))
      root.style.setProperty('--my', py.toFixed(4))
      root.style.setProperty('--px', (px * 2 - 1).toFixed(4))
      root.style.setProperty('--py', ((0.5 - py) * 2).toFixed(4))
      root.style.setProperty('--scroll', scroll.toFixed(4))
      root.style.setProperty('--vel', vel.toFixed(3))
      root.style.setProperty('--hue', (190 + scroll * 170).toFixed(1))
      root.style.setProperty('--tx', tx.toFixed(3))
      root.style.setProperty('--ty', ty.toFixed(3))

      raf = requestAnimationFrame(loop)
    }

    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('deviceorientation', onOrient, { passive: true })
      raf = requestAnimationFrame(loop)
    } else {
      // Still expose a static scroll value for spectrum/progress styling
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight || 1
        const scroll = Math.min(Math.max(window.scrollY / max, 0), 1)
        root.style.setProperty('--scroll', scroll.toFixed(4))
        root.style.setProperty('--hue', (190 + scroll * 170).toFixed(1))
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('deviceorientation', onOrient)
    }
  }, [])
}
