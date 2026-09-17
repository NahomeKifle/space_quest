import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  ENGINE_EMISSIVE,
  ENGINE_EMISSIVE_IDLE,
  ENGINE_EMISSIVE_TRAVEL,
  LIGHT_ENGINE_COLOR,
  LIGHT_ENGINE_DISTANCE,
  LIGHT_ENGINE_INTENSITY,
} from './visualConfig'

const hull = '#6a717c'
const hullDark = '#3c414a'
const hullEdge = '#8a919c'
const canopy = '#6d8aa3'
const engineBell = '#2a2d33'

function ShipFallback() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.18, 0.26, 1.9, 8]} />
      <meshStandardMaterial color={hullDark} metalness={0.45} roughness={0.5} />
    </mesh>
  )
}

function ShipModel({ idle = true }) {
  const groupRef = useRef(null)
  const glow = idle ? ENGINE_EMISSIVE_IDLE : ENGINE_EMISSIVE_TRAVEL
  const engineLight = idle
    ? LIGHT_ENGINE_INTENSITY * 0.72
    : LIGHT_ENGINE_INTENSITY

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return

    if (!idle) {
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.17, 0.27, 1.92, 14]} />
        <meshStandardMaterial
          color={hull}
          metalness={0.52}
          roughness={0.42}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0.12]}>
        <cylinderGeometry args={[0.21, 0.235, 0.78, 14]} />
        <meshStandardMaterial
          color={hullEdge}
          metalness={0.58}
          roughness={0.36}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1.14]}>
        <coneGeometry args={[0.17, 0.58, 14]} />
        <meshStandardMaterial
          color={hull}
          metalness={0.5}
          roughness={0.34}
        />
      </mesh>

      <mesh position={[0, 0.18, -0.32]} scale={[1.05, 0.48, 1.45]}>
        <sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshPhysicalMaterial
          color={canopy}
          metalness={0.18}
          roughness={0.16}
          clearcoat={0.35}
          clearcoatRoughness={0.28}
        />
      </mesh>

      <mesh position={[-0.9, -0.03, 0.28]} rotation={[0.05, 0.2, 0.08]}>
        <boxGeometry args={[1.28, 0.032, 0.58]} />
        <meshStandardMaterial
          color={hullDark}
          metalness={0.46}
          roughness={0.48}
        />
      </mesh>
      <mesh position={[0.9, -0.03, 0.28]} rotation={[0.05, -0.2, -0.08]}>
        <boxGeometry args={[1.28, 0.032, 0.58]} />
        <meshStandardMaterial
          color={hullDark}
          metalness={0.46}
          roughness={0.48}
        />
      </mesh>

      <mesh position={[-1.48, -0.01, 0.42]} rotation={[0.2, 0.45, 0.35]}>
        <boxGeometry args={[0.38, 0.028, 0.22]} />
        <meshStandardMaterial
          color={hullDark}
          metalness={0.44}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[1.48, -0.01, 0.42]} rotation={[0.2, -0.45, -0.35]}>
        <boxGeometry args={[0.38, 0.028, 0.22]} />
        <meshStandardMaterial
          color={hullDark}
          metalness={0.44}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[0, 0.28, 0.62]}>
        <boxGeometry args={[0.045, 0.38, 0.42]} />
        <meshStandardMaterial
          color={hullDark}
          metalness={0.42}
          roughness={0.46}
        />
      </mesh>

      <mesh position={[0, -0.14, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 8]} />
        <meshStandardMaterial
          color={hullDark}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[-0.2, -0.03, 1.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.125, 0.34, 12]} />
        <meshStandardMaterial
          color={engineBell}
          metalness={0.62}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0.2, -0.03, 1.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.125, 0.34, 12]} />
        <meshStandardMaterial
          color={engineBell}
          metalness={0.62}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[-0.2, -0.03, 1.26]}>
        <sphereGeometry args={[0.078, 12, 12]} />
        <meshStandardMaterial
          color={ENGINE_EMISSIVE}
          emissive={ENGINE_EMISSIVE}
          emissiveIntensity={glow}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.2, -0.03, 1.26]}>
        <sphereGeometry args={[0.078, 12, 12]} />
        <meshStandardMaterial
          color={ENGINE_EMISSIVE}
          emissive={ENGINE_EMISSIVE}
          emissiveIntensity={glow}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[-1.46, 0.01, 0.34]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial
          color="#c45a5a"
          emissive="#c45a5a"
          emissiveIntensity={0.7}
        />
      </mesh>
      <mesh position={[1.46, 0.01, 0.34]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial
          color="#5aa56a"
          emissive="#5aa56a"
          emissiveIntensity={0.7}
        />
      </mesh>

      <pointLight
        position={[0, -0.02, 1.22]}
        color={LIGHT_ENGINE_COLOR}
        intensity={engineLight}
        distance={LIGHT_ENGINE_DISTANCE}
        decay={2}
      />
    </group>
  )
}

function Spaceship({ idle = true }) {
  return (
    <Suspense fallback={<ShipFallback />}>
      <ShipModel idle={idle} />
    </Suspense>
  )
}

export default Spaceship
