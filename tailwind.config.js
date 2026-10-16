/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#05070B',
        abyss: '#0A0E15',
        panel: '#0A0E15',
        ink: '#E9EEF7',
        muted: '#97A3B6',
        mist: '#97A3B6',
        line: 'rgba(255,255,255,0.07)',
        ruby: '#E10600',
        rubysoft: '#FF3D3D',
        rubygold: '#FFB86B',
        cyanx: '#00E5FF',
        vio: '#7C3AED',
        gold: '#E8C47A'
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        serifit: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace']
      },
      boxShadow: {
        glass: '0 8px 40px rgba(0,0,0,0.45)',
        rubyglow: '0 10px 28px rgba(225,6,0,0.22)',
        cyanglow: '0 0 20px rgba(0,229,255,0.25)',
        premium: '0 24px 70px rgba(0,0,0,0.5)',
        card: '0 12px 40px rgba(0,0,0,0.4)'
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } }
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        spinSlow: 'spinSlow 14s linear infinite'
      }
    }
  },
  plugins: []
}
