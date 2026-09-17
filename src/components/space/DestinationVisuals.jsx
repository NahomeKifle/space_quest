import { BackSide } from 'three'

function emissive(active, rest, selected) {
  return active ? selected : rest
}

function TechPlanet({ active }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.48, 32, 24]} />
        <meshStandardMaterial
          color="#3b4a5c"
          emissive="#1c3a52"
          emissiveIntensity={emissive(active, 0.18, 0.42)}
          metalness={0.22}
          roughness={0.68}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.485, 0.012, 8, 48]} />
        <meshStandardMaterial
          color="#7ec8d8"
          emissive="#5aaec4"
          emissiveIntensity={emissive(active, 0.35, 0.85)}
          metalness={0.4}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[0.45, 0.2, 0.4]}>
        <torusGeometry args={[0.42, 0.008, 8, 40]} />
        <meshStandardMaterial
          color="#8aa4b8"
          emissive="#6a8aa0"
          emissiveIntensity={emissive(active, 0.2, 0.55)}
          metalness={0.5}
          roughness={0.32}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.45, 0.08, 0.22]}>
        <torusGeometry args={[0.78, 0.028, 8, 48]} />
        <meshStandardMaterial
          color="#b7c2cc"
          emissive="#8ea0b0"
          emissiveIntensity={emissive(active, 0.16, 0.48)}
          metalness={0.62}
          roughness={0.28}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.45, 0.08, 0.22]}>
        <torusGeometry args={[0.64, 0.01, 8, 40]} />
        <meshStandardMaterial
          color="#6d7c8a"
          metalness={0.55}
          roughness={0.36}
        />
      </mesh>
    </group>
  )
}

function StationHull({ active }) {
  return (
    <meshStandardMaterial
      color="#6e6b64"
      emissive="#8a8478"
      emissiveIntensity={emissive(active, 0.12, 0.4)}
      metalness={0.58}
      roughness={0.4}
    />
  )
}

function Station({ active }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.42, 10]} />
        <StationHull active={active} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46, 0.045, 8, 24]} />
        <meshStandardMaterial
          color="#5c5a55"
          emissive="#7a7468"
          emissiveIntensity={emissive(active, 0.1, 0.32)}
          metalness={0.62}
          roughness={0.38}
        />
      </mesh>
      <mesh position={[0.42, 0, 0]}>
        <boxGeometry args={[0.38, 0.14, 0.16]} />
        <StationHull active={active} />
      </mesh>
      <mesh position={[-0.42, 0, 0]}>
        <boxGeometry args={[0.38, 0.14, 0.16]} />
        <StationHull active={active} />
      </mesh>
      <mesh position={[0, 0, 0.42]}>
        <boxGeometry args={[0.16, 0.14, 0.38]} />
        <StationHull active={active} />
      </mesh>
      <mesh position={[0, 0, -0.42]}>
        <boxGeometry args={[0.16, 0.14, 0.38]} />
        <StationHull active={active} />
      </mesh>
      <mesh position={[0.78, 0.02, 0]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.42, 0.012, 0.28]} />
        <meshStandardMaterial
          color="#2c3644"
          metalness={0.35}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[-0.78, 0.02, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.42, 0.012, 0.28]} />
        <meshStandardMaterial
          color="#2c3644"
          metalness={0.35}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 0.42, 8]} />
        <StationHull active={active} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial
          color="#d8c48a"
          emissive="#d8c48a"
          emissiveIntensity={emissive(active, 0.55, 1.15)}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function ArchiveCore({ active }) {
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#c5d0dc"
          emissive="#8aa4bc"
          emissiveIntensity={emissive(active, 0.28, 0.7)}
          metalness={0.55}
          roughness={0.22}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshPhysicalMaterial
          color="#9eb4c8"
          emissive="#6a88a4"
          emissiveIntensity={emissive(active, 0.2, 0.55)}
          metalness={0.2}
          roughness={0.18}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
        />
      </mesh>
      <mesh position={[0.52, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.42, 0.012, 0.18]} />
        <meshStandardMaterial
          color="#4a5562"
          metalness={0.5}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[-0.52, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.42, 0.012, 0.18]} />
        <meshStandardMaterial
          color="#4a5562"
          metalness={0.5}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.28, 8]} />
        <meshStandardMaterial
          color="#8a96a4"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial
          color="#d6e6f4"
          emissive="#c0d8ee"
          emissiveIntensity={emissive(active, 0.7, 1.35)}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function EarthBody({ active }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.48, 32, 24]} />
        <meshStandardMaterial
          color="#3f6570"
          emissive="#1a3340"
          emissiveIntensity={emissive(active, 0.12, 0.28)}
          metalness={0.06}
          roughness={0.86}
        />
      </mesh>
      <mesh position={[0.12, 0.18, 0.32]} rotation={[0.4, 0.6, 0.2]}>
        <sphereGeometry args={[0.2, 12, 10]} />
        <meshStandardMaterial
          color="#5d7a62"
          metalness={0.04}
          roughness={0.9}
        />
      </mesh>
      <mesh position={[-0.22, -0.08, 0.3]} rotation={[0.2, -0.4, 0.1]} scale={[1.1, 0.55, 0.8]}>
        <sphereGeometry args={[0.18, 12, 10]} />
        <meshStandardMaterial
          color="#6a8468"
          metalness={0.04}
          roughness={0.88}
        />
      </mesh>
      <mesh position={[0.08, -0.28, -0.26]} scale={[0.9, 0.5, 0.7]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <meshStandardMaterial
          color="#54705c"
          metalness={0.04}
          roughness={0.9}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.505, 24, 18]} />
        <meshStandardMaterial
          color="#d8e4ec"
          transparent
          opacity={0.1}
          metalness={0}
          roughness={1}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.58, 24, 18]} />
        <meshBasicMaterial
          color="#7eabc0"
          transparent
          opacity={active ? 0.16 : 0.1}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function CommsSatellite({ active }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.11, 0.13, 0.36, 10]} />
        <meshStandardMaterial
          color="#6a737c"
          emissive="#5a6a74"
          emissiveIntensity={emissive(active, 0.12, 0.38)}
          metalness={0.58}
          roughness={0.34}
        />
      </mesh>
      <mesh position={[0, 0.08, 0.12]} rotation={[0.7, 0.15, 0]}>
        <sphereGeometry args={[0.22, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial
          color="#8a96a2"
          emissive="#6a8898"
          emissiveIntensity={emissive(active, 0.18, 0.5)}
          metalness={0.64}
          roughness={0.24}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.7, 0.18, 0.08]}>
        <torusGeometry args={[0.42, 0.035, 8, 28]} />
        <meshStandardMaterial
          color="#7a8a94"
          emissive="#6a9aaa"
          emissiveIntensity={emissive(active, 0.22, 0.62)}
          metalness={0.5}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0, 0.38, -0.04]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.42, 8]} />
        <meshStandardMaterial
          color="#9aa4ae"
          metalness={0.65}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[0, 0.6, -0.08]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial
          color="#9fd0e8"
          emissive="#8ec8e0"
          emissiveIntensity={emissive(active, 0.65, 1.25)}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

const visuals = {
  ringed: TechPlanet,
  station: Station,
  orb: ArchiveCore,
  crystal: EarthBody,
  ring: CommsSatellite,
}

function DestinationVisual({ geometryType, active }) {
  const Visual = visuals[geometryType] ?? ArchiveCore
  return <Visual active={active} />
}

export default DestinationVisual
