import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * D8 · Field — the 8th dimension layer.
 * Eight gate rings strung along the camera's scroll path that ignite as the
 * camera approaches, a scroll-hue-shifting hypersphere core, and a velocity-
 * reactive streak field wrapping the whole scene.
 */
const RING_Z = [5, 1.5, -2, -5.5, -9, -12.5, -16, -19.5]

export default function DimensionalRift({
  lowPower,
  progressRef,
  velocityRef
}: {
  lowPower: boolean
  progressRef: React.MutableRefObject<number>
  velocityRef: React.MutableRefObject<number>
}) {
  const rings = useRef<THREE.Group>(null!)
  const core = useRef<THREE.Mesh>(null!)
  const streaks = useRef<THREE.Points>(null!)
  const count = lowPower ? 4 : 8

  const streakPos = useMemo(() => {
    const n = lowPower ? 140 : 340
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 5 + Math.random() * 9
      const a = Math.random() * Math.PI * 2
      arr[i * 3] = Math.cos(a) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18
      arr[i * 3 + 2] = 8 - Math.random() * 34
    }
    return arr
  }, [lowPower])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1)
    const vel = THREE.MathUtils.clamp(velocityRef.current, 0, 3)
    const camZ = THREE.MathUtils.lerp(9, -14, p)

    if (rings.current) {
      rings.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const rz = RING_Z[i] ?? 0
        const near = Math.exp(-Math.pow(rz - (camZ - 4), 2) / 22)
        mesh.rotation.z += delta * (0.08 + i * 0.025 + vel * 0.25)
        mesh.scale.setScalar(1 + Math.sin(t * 1.4 + i * 0.9) * 0.02 + vel * 0.015)
        const mat = mesh.material as THREE.MeshBasicMaterial
        mat.opacity = 0.05 + near * 0.55 + vel * 0.04
      })
    }

    if (core.current) {
      core.current.rotation.y += delta * (0.25 + vel * 0.5)
      core.current.rotation.x = Math.sin(t * 0.5) * 0.3
      core.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.05 + vel * 0.05)
      const mat = core.current.material as THREE.MeshBasicMaterial
      mat.color.setHSL(0.55 - p * 0.55 + Math.sin(t * 0.3) * 0.02, 0.95, 0.55)
      mat.opacity = 0.22 + vel * 0.06
    }

    if (streaks.current) {
      streaks.current.rotation.y += delta * (0.015 + vel * 0.09)
      streaks.current.position.y = Math.sin(t * 0.25) * 0.5
    }
  })

  return (
    <group>
      <group ref={rings}>
        {Array.from({ length: count }).map((_, i) => (
          <mesh
            key={i}
            position={[(i % 2 === 0 ? 1 : -1) * i * 0.14, 0.2 + Math.sin(i * 1.3) * 0.4, RING_Z[i]]}
            rotation={[Math.PI / 2.15, 0, 0]}
          >
            <torusGeometry args={[2.1 + i * 0.9, 0.008, 8, lowPower ? 48 : 96]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#00E5FF' : '#FF2A4D'}
              transparent
              opacity={0.1}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
      <mesh ref={core} position={[0, 0.2, -6]}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points ref={streaks}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[streakPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#9FD8FF"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
