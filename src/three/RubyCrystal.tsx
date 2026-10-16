import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function RubyCrystal({ lowPower }: { lowPower: boolean }) {
  const core = useRef<THREE.Mesh>(null!)
  const ring1 = useRef<THREE.Mesh>(null!)
  const ring2 = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (core.current) {
      core.current.rotation.y += delta * 0.35
      core.current.rotation.x = Math.sin(t * 0.4) * 0.25
      const s = 1 + Math.sin(t * 1.6) * 0.03
      core.current.scale.setScalar(s)
    }
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.4
      ring1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.12
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.28
      ring2.current.rotation.y = Math.sin(t * 0.3) * 0.4
    }
  })

  return (
    <group position={[0, 0.2, 0]}>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh ref={core}>
          <octahedronGeometry args={[1.35, lowPower ? 0 : 1]} />
          <MeshDistortMaterial
            color="#CC0000"
            emissive="#550000"
            emissiveIntensity={0.7}
            roughness={0.15}
            metalness={0.85}
            distort={0.22}
            speed={2.4}
          />
        </mesh>
        <mesh scale={1.02}>
          <octahedronGeometry args={[1.35, 0]} />
          <meshBasicMaterial color="#FF2A2A" wireframe transparent opacity={0.18} />
        </mesh>
        <pointLight color="#CC0000" intensity={18} distance={9} decay={2} />
      </Float>

      <mesh ref={ring1}>
        <torusGeometry args={[2.35, 0.018, 12, 128]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.65} />
      </mesh>
      <mesh ref={ring2} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[2.9, 0.012, 12, 128]} />
        <meshBasicMaterial color="#CC0000" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
