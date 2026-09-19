import { BackSide } from 'three'
import FittedGltf from './FittedGltf'
import {
  GLTF_EXPERIENCE_DOME,
  GLTF_PLANET_ABOUT,
  GLTF_PLANET_PROJECTS,
} from './gltfAssets'

function emissive(active, rest, selected) {
  return active ? selected : rest
}

function Atmosphere({ radius, color, active, restOpacity = 0.1, activeOpacity = 0.16 }) {
  return (
    <mesh raycast={() => {}}>
      <sphereGeometry args={[radius, 24, 18]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={active ? activeOpacity : restOpacity}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function ProjectsPlanet({ active }) {
  return (
    <group>
      <FittedGltf url={GLTF_PLANET_PROJECTS} targetSize={1.92} />
      <Atmosphere
        radius={1.04}
        color="#5a3038"
        active={active}
        restOpacity={0.04}
        activeOpacity={0.08}
      />
    </group>
  )
}

function AboutPlanet({ active }) {
  return (
    <group>
      <FittedGltf url={GLTF_PLANET_ABOUT} targetSize={1.52} />
      <Atmosphere
        radius={0.84}
        color="#7eabc0"
        active={active}
        restOpacity={0.045}
        activeOpacity={0.08}
      />
    </group>
  )
}

function ExperienceStation({ active }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} raycast={() => {}}>
        <circleGeometry args={[0.92, 28]} />
        <meshStandardMaterial
          color="#2c3038"
          metalness={0.42}
          roughness={0.62}
          emissive="#3a414c"
          emissiveIntensity={emissive(active, 0.04, 0.14)}
        />
      </mesh>
      <mesh position={[0, -0.54, 0]} raycast={() => {}}>
        <cylinderGeometry args={[0.92, 1.02, 0.08, 24]} />
        <meshStandardMaterial
          color="#242830"
          metalness={0.38}
          roughness={0.58}
        />
      </mesh>
      <FittedGltf
        url={GLTF_EXPERIENCE_DOME}
        targetSize={1.42}
        position={[0, -0.08, 0]}
      />
      <mesh position={[0.58, 0.22, 0.42]} raycast={() => {}}>
        <cylinderGeometry args={[0.016, 0.02, 0.42, 6]} />
        <meshStandardMaterial color="#6a717a" metalness={0.55} roughness={0.4} />
      </mesh>
      <mesh position={[0.58, 0.46, 0.42]} raycast={() => {}}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial
          color="#c8b889"
          emissive="#c8b889"
          emissiveIntensity={emissive(active, 0.28, 0.7)}
        />
      </mesh>
    </group>
  )
}

function ArchiveBeacon({ active }) {
  return (
    <group>
      <mesh raycast={() => {}}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#9aa7b4"
          emissive="#6a7c8c"
          emissiveIntensity={emissive(active, 0.12, 0.32)}
          metalness={0.48}
          roughness={0.34}
        />
      </mesh>
      <mesh position={[0, 0.34, 0]} raycast={() => {}}>
        <cylinderGeometry args={[0.018, 0.018, 0.22, 8]} />
        <meshStandardMaterial color="#6a737c" metalness={0.55} roughness={0.36} />
      </mesh>
      <mesh position={[0, 0.48, 0]} raycast={() => {}}>
        <sphereGeometry args={[0.032, 10, 10]} />
        <meshStandardMaterial
          color="#c5d4e2"
          emissive="#a8c0d4"
          emissiveIntensity={emissive(active, 0.35, 0.75)}
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
        <cylinderGeometry args={[0.08, 0.1, 0.28, 10]} />
        <meshStandardMaterial
          color="#5c656e"
          emissive="#4a5660"
          emissiveIntensity={emissive(active, 0.06, 0.2)}
          metalness={0.52}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 0.12, 0.04]} rotation={[0.85, 0.1, 0]} raycast={() => {}}>
        <sphereGeometry args={[0.16, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2.15]} />
        <meshStandardMaterial
          color="#7a868f"
          metalness={0.58}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.32, -0.02]} raycast={() => {}}>
        <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
        <meshStandardMaterial color="#8a949c" metalness={0.6} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.46, -0.04]} raycast={() => {}}>
        <sphereGeometry args={[0.026, 8, 8]} />
        <meshStandardMaterial
          color="#8eb8c8"
          emissive="#7eacbc"
          emissiveIntensity={emissive(active, 0.32, 0.7)}
          toneMapped={false}
        />
      </mesh>
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
