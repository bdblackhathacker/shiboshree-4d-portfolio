import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const STATIONS = [
  { z: -2, label: 'ST-01 · MFOSL · Senior', color: '#CC0000' },
  { z: -10, label: 'ST-02 · Orgatro · Full-Stack', color: '#00F0FF' },
  { z: -18, label: 'ST-03 · Weinspect · Junior', color: '#7C3AED' }
]

export default function CircuitPath({ lowPower, progressRef }: { lowPower: boolean; progressRef: React.MutableRefObject<number> }) {
  const tubeRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.4, 4),
        new THREE.Vector3(1.2, -0.2, -3),
        new THREE.Vector3(-1.2, 0.3, -9),
        new THREE.Vector3(0.6, -0.3, -15),
        new THREE.Vector3(0, 0.2, -22)
      ]),
    []
  )

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.035, 8, false), [curve])
  const glowGeo = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.09, 8, false), [curve])

  useFrame((state) => {
    const p = progressRef.current
    const mat = tubeRef.current?.material as THREE.MeshBasicMaterial | undefined
    if (mat) {
      mat.color.setHSL(0.52 - p * 0.52, 0.95, 0.55)
    }
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial
      m.opacity = 0.16 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group>
      <mesh ref={glowRef} geometry={glowGeo}>
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={tubeRef} geometry={tubeGeo}>
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.75} />
      </mesh>
      {STATIONS.map((s) => (
        <group key={s.label} position={[0, 0.2, s.z]}>
          <mesh>
            <torusGeometry args={[0.55, 0.03, 12, 48]} />
            <meshBasicMaterial color={s.color} transparent opacity={0.9} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color={s.color} />
          </mesh>
          {!lowPower && (
            <Html position={[0, 0.9, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: s.color,
                  background: 'rgba(7,9,14,0.82)',
                  border: `1px solid ${s.color}66`,
                  padding: '4px 10px',
                  borderRadius: 6,
                  whiteSpace: 'nowrap'
                }}
              >
                {s.label}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}
