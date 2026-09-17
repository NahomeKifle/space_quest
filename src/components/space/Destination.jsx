import { useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import styles from './Destination.module.css'

const looks = {
  ringed: { color: '#738196', emissive: '#8ea0b8' },
  station: { color: '#7a7872', emissive: '#9a9488' },
  orb: { color: '#8eabc4', emissive: '#9ec0dc' },
  crystal: { color: '#7d8594', emissive: '#a7b0c0' },
  ring: { color: '#6a737c', emissive: '#86a4b0' },
}

function DestinationMesh({ geometryType, active }) {
  const look = looks[geometryType] ?? looks.orb
  const intensity = active ? 0.85 : 0.28

  if (geometryType === 'ringed') {
    return (
      <>
        <mesh>
          <sphereGeometry args={[0.48, 16, 16]} />
          <meshStandardMaterial
            color={look.color}
            emissive={look.emissive}
            emissiveIntensity={intensity}
            metalness={0.35}
            roughness={0.5}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0, 0.25]}>
          <torusGeometry args={[0.78, 0.035, 8, 32]} />
          <meshStandardMaterial
            color="#c5cdd6"
            emissive="#9aa7b4"
            emissiveIntensity={active ? 0.55 : 0.18}
            metalness={0.4}
            roughness={0.4}
          />
        </mesh>
      </>
    )
  }

  if (geometryType === 'station') {
    return (
      <>
        <mesh>
          <boxGeometry args={[0.72, 0.26, 0.72]} />
          <meshStandardMaterial
            color={look.color}
            emissive={look.emissive}
            emissiveIntensity={intensity}
            metalness={0.45}
            roughness={0.42}
          />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <boxGeometry args={[0.16, 0.48, 0.16]} />
          <meshStandardMaterial
            color={look.color}
            emissive={look.emissive}
            emissiveIntensity={intensity}
            metalness={0.45}
            roughness={0.42}
          />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.52, 0.52, 0.07, 12]} />
          <meshStandardMaterial
            color="#5c5a55"
            emissive={look.emissive}
            emissiveIntensity={active ? 0.4 : 0.12}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      </>
    )
  }

  if (geometryType === 'crystal') {
    return (
      <mesh>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={look.color}
          emissive={look.emissive}
          emissiveIntensity={intensity}
          metalness={0.55}
          roughness={0.28}
        />
      </mesh>
    )
  }

  if (geometryType === 'ring') {
    return (
      <mesh rotation={[Math.PI / 2.8, 0.2, 0]}>
        <torusGeometry args={[0.42, 0.13, 10, 24]} />
        <meshStandardMaterial
          color={look.color}
          emissive={look.emissive}
          emissiveIntensity={intensity}
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>
    )
  }

  return (
    <mesh>
      <sphereGeometry args={[0.42, 16, 16]} />
      <meshStandardMaterial
        color={look.color}
        emissive={look.emissive}
        emissiveIntensity={active ? 1.15 : 0.5}
        metalness={0.25}
        roughness={0.35}
      />
    </mesh>
  )
}

function Destination({
  id,
  label,
  position,
  geometryType,
  labelOffset = [0, 1.28, 0],
  selected,
  onSelect,
}) {
  const groupRef = useRef(null)
  const { gl } = useThree()
  const [hovered, setHovered] = useState(false)
  const active = hovered || selected

  useEffect(() => {
    gl.domElement.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      gl.domElement.style.cursor = 'auto'
    }
  }, [gl, hovered])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    group.rotation.y += delta * 0.12
    const target = active ? 1.12 : 1
    const next = group.scale.x + (target - group.scale.x) * Math.min(1, delta * 5)
    group.scale.setScalar(next)
  })

  return (
    <group position={position}>
      <group
        ref={groupRef}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(id)
        }}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh visible={false}>
          <sphereGeometry args={[0.95, 8, 8]} />
        </mesh>
        <DestinationMesh geometryType={geometryType} active={active} />
      </group>
      <Html
        position={labelOffset}
        center
        pointerEvents="none"
        zIndexRange={[4, 0]}
      >
        <div className={active ? `${styles.label} ${styles.labelActive}` : styles.label}>
          {label}
        </div>
      </Html>
    </group>
  )
}

export default Destination
