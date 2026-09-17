import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const hull = '#8b919c'
const hullDark = '#5c616b'
const glass = '#5a7d99'
const engine = '#2f3238'
const glow = '#7ec8ff'

function Spaceship() {
  const groupRef = useRef(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    if (!group) return

    group.position.y = Math.sin(t * 0.55) * 0.1
    group.rotation.z = Math.sin(t * 0.4) * 0.025
    group.rotation.y = Math.sin(t * 0.18) * 0.04
  })

  return (
    <group ref={groupRef} position={[0, 0.15, 0]}>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.32, 2.15, 10]} />
        <meshStandardMaterial color={hull} metalness={0.55} roughness={0.38} />
      </mesh>

      <mesh position={[0, 0, -1.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.62, 10]} />
        <meshStandardMaterial color={hull} metalness={0.5} roughness={0.32} />
      </mesh>

      <mesh position={[0, 0.2, -0.28]}>
        <boxGeometry args={[0.34, 0.16, 0.52]} />
        <meshStandardMaterial
          color={glass}
          metalness={0.7}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[-0.92, -0.04, 0.22]} rotation={[0, 0.18, 0.06]}>
        <boxGeometry args={[1.15, 0.05, 0.62]} />
        <meshStandardMaterial color={hullDark} metalness={0.45} roughness={0.45} />
      </mesh>
      <mesh position={[0.92, -0.04, 0.22]} rotation={[0, -0.18, -0.06]}>
        <boxGeometry args={[1.15, 0.05, 0.62]} />
        <meshStandardMaterial color={hullDark} metalness={0.45} roughness={0.45} />
      </mesh>

      <mesh position={[0, 0.32, 0.78]}>
        <boxGeometry args={[0.06, 0.42, 0.38]} />
        <meshStandardMaterial color={hullDark} metalness={0.4} roughness={0.42} />
      </mesh>

      <mesh position={[-0.2, -0.04, 1.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.32, 10]} />
        <meshStandardMaterial color={engine} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.2, -0.04, 1.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.32, 10]} />
        <meshStandardMaterial color={engine} metalness={0.6} roughness={0.35} />
      </mesh>

      <mesh position={[-0.2, -0.04, 1.36]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial
          color={glow}
          emissive={glow}
          emissiveIntensity={2.2}
        />
      </mesh>
      <mesh position={[0.2, -0.04, 1.36]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial
          color={glow}
          emissive={glow}
          emissiveIntensity={2.2}
        />
      </mesh>
    </group>
  )
}

export default Spaceship
