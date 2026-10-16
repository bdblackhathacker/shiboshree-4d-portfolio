import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const NODES = [
  { label: 'PostgreSQL', color: '#00F0FF', radius: 3.4, speed: 0.5, size: 0.16, offset: 0 },
  { label: 'React', color: '#61DAFB', radius: 3.7, speed: -0.42, size: 0.14, offset: 1.25 },
  { label: 'TypeScript', color: '#3178C6', radius: 3.2, speed: 0.62, size: 0.13, offset: 2.5 },
  { label: 'Docker', color: '#2496ED', radius: 4.0, speed: -0.34, size: 0.15, offset: 3.7 },
  { label: 'Redis', color: '#FF4438', radius: 3.55, speed: 0.46, size: 0.14, offset: 5.0 }
]

function Node({ label, color, radius, speed, size, offset, index, lowPower }: (typeof NODES)[number] & { index: number; lowPower: boolean }) {
  const ref = useRef<THREE.Group>(null!)
  const dot = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    const y = Math.sin(t * 1.7 + index) * 0.7 + 0.2
    if (ref.current) ref.current.position.set(x, y, z)
    if (dot.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3 + index * 2) * 0.18
      dot.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={ref}>
      <mesh ref={dot}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} roughness={0.2} />
      </mesh>
      <pointLight color={color} intensity={4} distance={4} />
      {!lowPower && (
        <Html distanceFactor={10} position={[0, 0.42, 0]} center occlude={false} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'JetBrains Mono, monospace',
              color,
              background: 'rgba(7,9,14,0.78)',
              border: `1px solid ${color}55`,
              padding: '2px 8px',
              borderRadius: 999,
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(6px)'
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function OrbitNodes({ lowPower }: { lowPower: boolean }) {
  return (
    <group>
      {NODES.map((n, i) => (
        <Node key={n.label} {...n} index={i} lowPower={lowPower} />
      ))}
    </group>
  )
}
