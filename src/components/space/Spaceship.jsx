import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import FittedGltf from './FittedGltf'
import { GLTF_SPITFIRE } from './gltfAssets'
import {
  LIGHT_ENGINE_COLOR,
  LIGHT_ENGINE_DISTANCE,
  LIGHT_ENGINE_INTENSITY,
} from './visualConfig'

// Visual-only transform. TravelController still treats local -Z as forward.
const SPITFIRE_TARGET_SIZE = 2.9
const SPITFIRE_ROTATION = [0, 0, 0]
const SPITFIRE_OFFSET = [0, 0.04, 0]

function ShipFallback() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
      <cylinderGeometry args={[0.16, 0.24, 1.6, 8]} />
      <meshStandardMaterial color="#3c414a" metalness={0.4} roughness={0.55} />
    </mesh>
  )
}

function ShipModel({ idle = true, reducedMotion = false }) {
  const groupRef = useRef(null)
  const engineLight = idle
    ? LIGHT_ENGINE_INTENSITY * 0.72
    : LIGHT_ENGINE_INTENSITY

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return

    if (!idle || reducedMotion) {
      group.position.y = 0
      group.rotation.set(0, 0, 0)
      return
    }

    const t = state.clock.elapsedTime
    group.position.y = Math.sin(t * 0.55) * 0.1
    group.rotation.z = Math.sin(t * 0.4) * 0.025
    group.rotation.y = Math.sin(t * 0.18) * 0.04
  })

  return (
    <group ref={groupRef}>
      <FittedGltf
        url={GLTF_SPITFIRE}
        targetSize={SPITFIRE_TARGET_SIZE}
        rotation={SPITFIRE_ROTATION}
        position={SPITFIRE_OFFSET}
      />
      <pointLight
        position={[0, -0.04, 0.82]}
        color={LIGHT_ENGINE_COLOR}
        intensity={engineLight}
        distance={LIGHT_ENGINE_DISTANCE}
        decay={2}
      />
    </group>
  )
}

function Spaceship({ idle = true, reducedMotion = false }) {
  return (
    <Suspense fallback={<ShipFallback />}>
      <ShipModel idle={idle} reducedMotion={reducedMotion} />
    </Suspense>
  )
}

export default Spaceship
