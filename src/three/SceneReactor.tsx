import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export type ViewMode = 'ui' | 'arch'

const FOG_UI = new THREE.Color('#07090E')
const FOG_ARCH = new THREE.Color('#08131F')

export default function SceneReactor({ modeRef }: { modeRef: React.MutableRefObject<ViewMode> }) {
  const { scene } = useThree()
  const cyan = useRef<THREE.PointLight>(null!)
  const ruby = useRef<THREE.PointLight>(null!)

  useFrame((state, delta) => {
    const arch = modeRef.current === 'arch'
    const k = 1 - Math.exp(-2.6 * delta)

    if (cyan.current) {
      cyan.current.intensity = THREE.MathUtils.lerp(cyan.current.intensity, arch ? 26 : 12, k)
      cyan.current.distance = THREE.MathUtils.lerp(cyan.current.distance, arch ? 34 : 20, k)
    }
    if (ruby.current) {
      ruby.current.intensity = THREE.MathUtils.lerp(ruby.current.intensity, arch ? 3 : 10, k)
    }
    const fog = scene.fog as THREE.Fog | null
    if (fog) {
      const target = arch ? FOG_ARCH : FOG_UI
      fog.color.lerp(target, k * 0.6)
    }
    const bg = scene.background as THREE.Color | null
    if (bg && bg.isColor) {
      bg.lerp(arch ? FOG_ARCH : FOG_UI, k * 0.6)
    }
    void state
  })

  return (
    <>
      <pointLight ref={cyan} position={[-6, 3, 4]} intensity={12} color="#00F0FF" distance={20} />
      <pointLight ref={ruby} position={[5, -2, -6]} intensity={10} color="#CC0000" distance={22} />
    </>
  )
}
