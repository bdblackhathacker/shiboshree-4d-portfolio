import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isMobile
}

export function usePerfMode() {
  const [lowPower, setLowPower] = useState(false)
  const [manual, setManual] = useState<boolean | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (manual !== null) {
      setLowPower(manual)
      return
    }
    const saveData =
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData ?? false
    const weakCpu = (navigator as unknown as { hardwareConcurrency?: number }).hardwareConcurrency
      ? (navigator as unknown as { hardwareConcurrency: number }).hardwareConcurrency <= 4
      : false
    setLowPower(Boolean(isMobile || saveData || weakCpu))
  }, [isMobile, manual])

  return { lowPower, manual, setManual, isMobile }
}
