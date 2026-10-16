import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Vector2 } from 'three'

export default function PostFX({ velocityRef }: { velocityRef: React.MutableRefObject<number> }) {
  const offset = useMemo(() => new Vector2(0.0007, 0.0004), [])

  useFrame(() => {
    const v = Math.min(Math.abs(velocityRef.current) / 22, 1)
    offset.x = 0.0007 + v * 0.0034
    offset.y = 0.0004 + v * 0.0019
  })

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.55} luminanceThreshold={0.62} luminanceSmoothing={0.25} mipmapBlur radius={0.72} />
      <ChromaticAberration offset={offset} radialModulation={false} modulationOffset={0} />
      <Vignette offset={0.26} darkness={0.62} eskil={false} />
    </EffectComposer>
  )
}
