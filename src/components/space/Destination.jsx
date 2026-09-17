import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import DestinationVisual from './DestinationVisuals'
import { DESTINATION_HIT_RADIUS } from './visualConfig'
import styles from './Destination.module.css'

function disableMeshRaycast(object) {
  object.traverse((child) => {
    if (child.isMesh) child.raycast = () => {}
  })
}

function Destination({
  id,
  label,
  position,
  geometryType,
  labelOffset = [0, 1.28, 0],
  selected,
  interactive = true,
  onSelect,
}) {
  const groupRef = useRef(null)
  const visualRef = useRef(null)
  const { gl } = useThree()
  const [hovered, setHovered] = useState(false)
  const active = selected || (interactive && hovered)

  useLayoutEffect(() => {
    if (visualRef.current) disableMeshRaycast(visualRef.current)
  }, [geometryType])

  useEffect(() => {
    if (!interactive) setHovered(false)
  }, [interactive])

  useEffect(() => {
    gl.domElement.style.cursor = interactive && hovered ? 'pointer' : 'auto'
    return () => {
      gl.domElement.style.cursor = 'auto'
    }
  }, [gl, hovered, interactive])

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
      <group ref={groupRef}>
        <mesh
          visible={false}
          onClick={(event) => {
            event.stopPropagation()
            if (!interactive) return
            onSelect(id)
          }}
          onPointerOver={(event) => {
            event.stopPropagation()
            if (!interactive) return
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[DESTINATION_HIT_RADIUS, 8, 8]} />
        </mesh>
        <group ref={visualRef}>
          <DestinationVisual geometryType={geometryType} active={active} />
        </group>
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
