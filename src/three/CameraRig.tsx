import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraRig({
  progressRef,
  velocityRef
}: {
  progressRef: React.MutableRefObject<number>
  velocityRef: React.MutableRefObject<number>
}) {
  const { pointer, camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0.4, 9))
  const look = useRef(new THREE.Vector3(0, 0.2, 0))
  const lookTarget = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1)
    const vel = THREE.MathUtils.clamp(velocityRef.current, 0, 3)

    // Scroll flythrough: hero z=9 → deep timeline z=-14
    const z = THREE.MathUtils.lerp(9, -14, p)
    const xPath = Math.sin(p * Math.PI * 2.2) * 1.4
    const yBase = THREE.MathUtils.lerp(0.4, -0.1, p)

    // Mouse parallax + velocity kick (4th dimension: time/energy)
    const px = pointer.x * (0.9 + vel * 0.25)
    const py = pointer.y * (0.6 + vel * 0.15)

    target.current.set(
      THREE.MathUtils.lerp(target.current.x, xPath + px, 1 - Math.exp(-3 * delta)),
      THREE.MathUtils.lerp(target.current.y, yBase + py, 1 - Math.exp(-3 * delta)),
      THREE.MathUtils.lerp(target.current.z, z, 1 - Math.exp(-2.4 * delta))
    )
    camera.position.copy(target.current)

    // FOV widens slightly with velocity for kinetic feel
    const persp = camera as THREE.PerspectiveCamera
    const targetFov = 58 + vel * 5 + Math.abs(pointer.x) * 3
    persp.fov = THREE.MathUtils.lerp(persp.fov, targetFov, 1 - Math.exp(-3 * delta))
    persp.updateProjectionMatrix()

    lookTarget.current.set(px * 0.4, 0.2 + py * 0.25, target.current.z - 6)
    look.current.lerp(lookTarget.current, 1 - Math.exp(-3.2 * delta))
    camera.lookAt(look.current)

    // Subtle roll
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, -pointer.x * 0.03 - vel * 0.008, 0.06)
    void state
  })

  return null
}
