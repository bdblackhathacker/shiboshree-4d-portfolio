import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import RubyCrystal from './RubyCrystal'
import OrbitNodes from './OrbitNodes'
import ParticleField from './ParticleField'
import CircuitPath from './CircuitPath'
import CameraRig from './CameraRig'
import SceneReactor, { type ViewMode } from './SceneReactor'
import { useEffect } from 'react'

export default function Experience({
  lowPower,
  progressRef,
  velocityRef,
  modeRef
}: {
  lowPower: boolean
  progressRef: React.MutableRefObject<number>
  velocityRef: React.MutableRefObject<number>
  modeRef: React.MutableRefObject<ViewMode>
}) {
  useEffect(() => {
    let raf = 0
    let lastY = window.scrollY
    let lastT = performance.now()

    const loop = () => {
      const y = window.scrollY
      const t = performance.now()
      const dt = Math.max((t - lastT) / 1000, 0.016)
      const max = document.documentElement.scrollHeight - window.innerHeight || 1
      const target = Math.min(Math.max(y / max, 0), 1)
      progressRef.current += (target - progressRef.current) * 0.12
      const instVel = Math.min(Math.abs(y - lastY) / (dt * 900), 4)
      velocityRef.current += (instVel - velocityRef.current) * 0.08
      lastY = y
      lastT = t
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [progressRef, velocityRef])

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={lowPower ? [1, 1] : [1, 1.75]}
        camera={{ position: [0, 0.4, 9], fov: 58, near: 0.1, far: 120 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'radial-gradient(1200px 700px at 50% 20%, #101828 0%, #07090E 60%, #04060A 100%)' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#07090E']} />
          <fog attach="fog" args={['#07090E', 12, 34]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[6, 8, 6]} intensity={1.1} color="#E6ECF5" />
          <SceneReactor modeRef={modeRef} />
          <RubyCrystal lowPower={lowPower} />
          <OrbitNodes lowPower={lowPower} />
          <ParticleField lowPower={lowPower} />
          <CircuitPath lowPower={lowPower} progressRef={progressRef} />
          <CameraRig progressRef={progressRef} velocityRef={velocityRef} />
          {!lowPower && <AdaptiveDpr />}
          <Preload all />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(900px 480px at 50% 38%, transparent 55%, rgba(4,6,10,0.72) 100%)' }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-obsidian via-obsidian/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
    </div>
  )
}
