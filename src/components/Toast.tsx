import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent('app-toast', { detail: message }))
}

export default function ToastHost() {
  const [msgs, setMsgs] = useState<{ id: number; text: string }[]>([])

  useEffect(() => {
    let n = 0
    const on = (e: Event) => {
      const id = ++n
      setMsgs((p) => [...p.slice(-2), { id, text: (e as CustomEvent<string>).detail }])
      setTimeout(() => setMsgs((p) => p.filter((m) => m.id !== id)), 2400)
    }
    window.addEventListener('app-toast', on)
    return () => window.removeEventListener('app-toast', on)
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 flex-col items-center gap-2 px-4 lg:bottom-8">
      <AnimatePresence>
        {msgs.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="card max-w-md rounded-xl px-4 py-2.5 text-center font-mono2 text-[11px] leading-relaxed text-ink"
            style={{ boxShadow: '0 24px 70px rgba(0,0,0,0.6)' }}
          >
            {m.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
