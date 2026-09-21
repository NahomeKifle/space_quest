import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import FittedGltf from './FittedGltf'
import {
  GLTF_EXPERIENCE_DOME,
  GLTF_PLANET_ABOUT,
  GLTF_PLANET_PROJECTS,
} from './gltfAssets'

function emissive(active, rest, selected) {
  return active ? selected : rest
}

function SignalLight({ position, color, rest = 0.28, activeBoost = 0.55, active }) {
  const materialRef = useRef(null)

  useFrame((state) => {
    const material = materialRef.current
    if (!material) return
    const pulse = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 2.1)
    material.emissiveIntensity = rest + pulse * (active ? activeBoost : 0.22)
  })

  return (
    <mesh position={position} raycast={() => {}}>
      <sphereGeometry args={[0.028, 8, 8]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={rest}
        toneMapped={false}
      />
    </mesh>
  )
}

function ProjectsPlanet() {
  return <FittedGltf url={GLTF_PLANET_PROJECTS} targetSize={2.68} />
}

function AboutPlanet() {
  return <FittedGltf url={GLTF_PLANET_ABOUT} targetSize={1.56} />
}

function ExperienceStation({ active }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.46, 0]} raycast={() => {}}>
        <torusGeometry args={[0.82, 0.028, 8, 32]} />
        <meshStandardMaterial
          color="#3a414c"
          metalness={0.5}
          roughness={0.42}
          emissive="#2c333c"
          emissiveIntensity={emissive(active, 0.05, 0.16)}
        />
      </mesh>
      <mesh position={[0, -0.48, 0]} raycast={() => {}}>
        <cylinderGeometry args={[0.46, 0.52, 0.05, 8]} />
        <meshStandardMaterial color="#2a2e36" metalness={0.4} roughness={0.55} />
      </mesh>
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle) => (
        <mesh
          key={angle}
          position={[Math.cos(angle) * 0.38, -0.72, Math.sin(angle) * 0.38]}
          rotation={[0.55 * Math.cos(angle), 0, -0.55 * Math.sin(angle)]}
          raycast={() => {}}
        >
          <cylinderGeometry args={[0.016, 0.022, 0.42, 6]} />
          <meshStandardMaterial color="#4a515a" metalness={0.48} roughness={0.46} />
        </mesh>
      ))}
      <FittedGltf
        url={GLTF_EXPERIENCE_DOME}
        targetSize={1.36}
        position={[0, -0.06, 0]}
      />
      <mesh position={[0.52, 0.28, 0.38]} raycast={() => {}}>
        <cylinderGeometry args={[0.014, 0.018, 0.38, 6]} />
        <meshStandardMaterial color="#6a717a" metalness={0.55} roughness={0.4} />
      </mesh>
      <mesh position={[0.52, 0.5, 0.38]} raycast={() => {}}>
        <sphereGeometry args={[0.026, 8, 8]} />
        <meshStandardMaterial
          color="#c8b889"
          emissive="#c8b889"
          emissiveIntensity={emissive(active, 0.24, 0.62)}
        />
      </mesh>
    </group>
  )
}

function ArchiveBeacon({ active }) {
  return (
    <group>
      <mesh raycast={() => {}}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color="#8e9aa8"
          emissive="#5d6d7c"
          emissiveIntensity={emissive(active, 0.1, 0.28)}
          metalness={0.46}
          roughness={0.36}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => {}}>
        <torusGeometry args={[0.26, 0.014, 8, 22]} />
        <meshStandardMaterial color="#6d767f" metalness={0.58} roughness={0.32} />
      </mesh>
      {[-0.2, 0.2].map((x) =>
        [-0.2, 0.2].map((z) => (
          <mesh key={`${x}:${z}`} position={[x, 0, z]} raycast={() => {}}>
            <boxGeometry args={[0.032, 0.28, 0.032]} />
            <meshStandardMaterial color="#5c656e" metalness={0.5} roughness={0.4} />
          </mesh>
        ))
      )}
      <mesh position={[0, 0.32, 0]} raycast={() => {}}>
        <cylinderGeometry args={[0.014, 0.014, 0.22, 8]} />
        <meshStandardMaterial color="#7a848e" metalness={0.55} roughness={0.34} />
      </mesh>
      <mesh position={[0, 0.46, 0]} raycast={() => {}}>
        <boxGeometry args={[0.06, 0.05, 0.06]} />
        <meshStandardMaterial
          color="#c5d4e2"
          emissive="#9bb4c6"
          emissiveIntensity={emissive(active, 0.32, 0.7)}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function CommsBeacon({ active }) {
  return (
    <group>
      <mesh raycast={() => {}}>
        <cylinderGeometry args={[0.07, 0.09, 0.26, 10]} />
        <meshStandardMaterial
          color="#5a636c"
          emissive="#3e4850"
          emissiveIntensity={emissive(active, 0.05, 0.16)}
          metalness={0.52}
          roughness={0.38}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => {}}>
        <torusGeometry args={[0.2, 0.01, 8, 24]} />
        <meshStandardMaterial color="#7a848e" metalness={0.58} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.1, 0.05]} rotation={[0.9, 0.12, 0]} raycast={() => {}}>
        <sphereGeometry args={[0.15, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial color="#7a868f" metalness={0.6} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.28, -0.02]} raycast={() => {}}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
        <meshStandardMaterial color="#8a949c" metalness={0.6} roughness={0.32} />
      </mesh>
      <SignalLight
        position={[0, 0.4, -0.03]}
        color="#8eb8c8"
        active={active}
      />
    </group>
  )
}

export function VisualFallback() {
  return (
    <mesh raycast={() => {}}>
      <sphereGeometry args={[0.32, 12, 10]} />
      <meshStandardMaterial color="#16181e" metalness={0.2} roughness={0.8} />
    </mesh>
  )
}

const visuals = {
  ringed: ProjectsPlanet,
  station: ExperienceStation,
  orb: ArchiveBeacon,
  crystal: AboutPlanet,
  ring: CommsBeacon,
}

function DestinationVisual({ geometryType, active }) {
  const Visual = visuals[geometryType] ?? ArchiveBeacon
  return <Visual active={active} />
}

export default DestinationVisual
