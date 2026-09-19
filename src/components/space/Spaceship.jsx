import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Euler } from 'three'
import FittedGltf from './FittedGltf'
import { GLTF_SPITFIRE } from './gltfAssets'
import {
  LIGHT_ENGINE_COLOR,
  LIGHT_ENGINE_DISTANCE,
  LIGHT_ENGINE_INTENSITY,
} from './visualConfig'
import {
  BANK_GAIN,
  BANK_MAX,
  BANK_RETURN,
  MAX_FRAME_DELTA,
  TRAVEL_SPEED,
} from './travelConfig'

// Visual-only transform. TravelController still treats local -Z as forward.
const SPITFIRE_TARGET_SIZE = 2.9
const SPITFIRE_ROTATION = [0, 0, 0]
const SPITFIRE_OFFSET = [0, 0.04, 0]
const ENGINE_IDLE = LIGHT_ENGINE_INTENSITY * 0.72
const ENGINE_TRAVEL_MIN = LIGHT_ENGINE_INTENSITY * 0.8
const ENGINE_TRAVEL_GAIN = LIGHT_ENGINE_INTENSITY * 0.28

const yawEuler = new Euler()

function ShipFallback() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
      <cylinderGeometry args={[0.16, 0.24, 1.6, 8]} />
      <meshStandardMaterial color="#3c414a" metalness={0.4} roughness={0.55} />
    </mesh>
  )
}

function wrapAngle(value) {
  if (value > Math.PI) return value - Math.PI * 2
  if (value < -Math.PI) return value + Math.PI * 2
  return value
}

function ShipModel({ idle = true, reducedMotion = false }) {
  const groupRef = useRef(null)
  const lightRef = useRef(null)
  const prevYaw = useRef(null)
  const bank = useRef(0)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const dt = Math.min(delta, MAX_FRAME_DELTA)
    const parent = group.parent
    const speed = parent?.userData.travelSpeed ?? 0
    const cruise = Math.min(Math.max(speed / TRAVEL_SPEED, 0), 1)
    const light = lightRef.current
    if (light) {
      const target = idle
        ? ENGINE_IDLE
        : ENGINE_TRAVEL_MIN + ENGINE_TRAVEL_GAIN * cruise
      light.intensity += (target - light.intensity) * (1 - Math.exp(-5.5 * dt))
    }

    if (idle) {
      prevYaw.current = null
      bank.current = 0
      if (reducedMotion) {
        group.position.y = 0
        group.rotation.set(0, 0, 0)
        return
      }

      const t = state.clock.elapsedTime
      group.position.y = Math.sin(t * 0.55) * 0.1
      group.rotation.z = Math.sin(t * 0.4) * 0.025
      group.rotation.y = Math.sin(t * 0.18) * 0.04
      return
    }

    group.position.y = 0
    group.rotation.x = 0
    group.rotation.y = 0

    if (!parent) {
      group.rotation.z = 0
      return
    }

    yawEuler.setFromQuaternion(parent.quaternion, 'YXZ')
    const yaw = yawEuler.y
    if (prevYaw.current === null) prevYaw.current = yaw
    const yawRate = wrapAngle(yaw - prevYaw.current) / Math.max(dt, 1 / 120)
    prevYaw.current = yaw

    const targetBank = Math.max(-BANK_MAX, Math.min(BANK_MAX, -yawRate * BANK_GAIN))
    const smoothing = 1 - Math.exp(-BANK_RETURN * dt)
    bank.current += (targetBank - bank.current) * smoothing
    group.rotation.z = bank.current
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
        ref={lightRef}
        position={[0, -0.04, 0.82]}
        color={LIGHT_ENGINE_COLOR}
        intensity={ENGINE_IDLE}
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
