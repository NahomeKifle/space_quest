import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import DestinationVisual, { VisualFallback } from './DestinationVisuals'
import {
  DESTINATION_HIT_RADIUS,
  DESTINATION_HOVER_SCALE,
  DESTINATION_SELECTED_SCALE,
} from './visualConfig'
import styles from './Destination.module.css'

function disableMeshRaycast(object) {
  object.traverse((child) => {
    if (child.isMesh) child.raycast = () => {}
  })
}

function labelClass(emphasis, dimmed) {
  if (emphasis === 'selected') return `${styles.label} ${styles.labelActive}`
  if (emphasis === 'hover') return `${styles.label} ${styles.labelHover}`
  if (dimmed) return `${styles.label} ${styles.labelDim}`
  return styles.label
}

function Destination({
  id,
  label,
  position,
  geometryType,
  visualScale = 1,
  labelOffset = [0, 1.28, 0],
  hitRadius = DESTINATION_HIT_RADIUS,
  selected,
  dimmed = false,
  interactive = true,
  reducedMotion = false,
  onSelect,
  onHoverChange,
}) {
  const groupRef = useRef(null)
  const visualRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const emphasis = selected
    ? 'selected'
    : interactive && hovered
      ? 'hover'
      : 'idle'

  useLayoutEffect(() => {
    if (visualRef.current) disableMeshRaycast(visualRef.current)
  }, [geometryType])

  useEffect(() => {
    if (!interactive) setHovered(false)
  }, [interactive])

  useEffect(() => {
    if (!hovered || !onHoverChange) return undefined
    onHoverChange(true)
    return () => onHoverChange(false)
  }, [hovered, onHoverChange])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    if (!reducedMotion) group.rotation.y += delta * 0.055
    const target =
      emphasis === 'selected'
        ? DESTINATION_SELECTED_SCALE
        : emphasis === 'hover'
          ? DESTINATION_HOVER_SCALE
          : 1
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
          <sphereGeometry args={[hitRadius, 8, 8]} />
        </mesh>
        <group ref={visualRef} scale={visualScale}>
          <Suspense fallback={<VisualFallback />}>
            <DestinationVisual geometryType={geometryType} emphasis={emphasis} />
          </Suspense>
        </group>
      </group>
      <Html
        position={labelOffset}
        center
        pointerEvents="none"
        zIndexRange={[4, 0]}
      >
        <div className={labelClass(emphasis, dimmed)} aria-hidden="true">
          {label}
        </div>
      </Html>
    </group>
  )
}

export default Destination
