import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ lowPower, count = 1400 }: { lowPower: boolean; count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const n = lowPower ? Math.floor(count * 0.3) : count

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(n * 3)
    const colors = new Float32Array(n * 3)
    const cA = new THREE.Color('#00F0FF')
    const cB = new THREE.Color('#CC0000')
    const cC = new THREE.Color('#334155')
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4
      const r = Math.random()
      const c = r < 0.45 ? cA : r < 0.7 ? cB : cC
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [n])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.4
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  )
}
