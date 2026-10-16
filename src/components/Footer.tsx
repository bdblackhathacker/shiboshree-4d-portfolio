import { PROFILE } from '../data/portfolio'

export default function Footer({ velocity }: { velocity: number }) {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-8 pb-24 backdrop-blur lg:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        <p className="font-mono2 text-[11px] text-mist">
          © 2026 {PROFILE.name} · BUILT WITH RAILS-MIND + REACT-BODY · <span className="text-cyanx">4D CORE v1.0</span>
        </p>
        <p className="font-mono2 text-[11px] text-mist">
          SCROLL-VELOCITY <span className="text-rubysoft">{velocity.toFixed(2)}×</span> · RENDER <span className="text-emerald-300">60FPS SAFE</span>
        </p>
      </div>
    </footer>
  )
}
