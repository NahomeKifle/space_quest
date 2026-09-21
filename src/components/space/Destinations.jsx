import { useCallback, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import Destination from './Destination'
import {
  getDestinationLabelOffset,
  getDestinationPosition,
} from './destinationData'

function Destinations({
  destinations,
  compact = false,
  selectedId,
  interactive = true,
  reducedMotion = false,
  onSelect,
}) {
  const gl = useThree((state) => state.gl)
  const hoverCountRef = useRef(0)

  const syncCursor = useCallback(() => {
    gl.domElement.style.cursor =
      interactive && hoverCountRef.current > 0 ? 'pointer' : 'auto'
  }, [gl, interactive])

  const handleHoverChange = useCallback(
    (hovered) => {
      hoverCountRef.current += hovered ? 1 : -1
      if (hoverCountRef.current < 0) hoverCountRef.current = 0
      syncCursor()
    },
    [syncCursor]
  )

  useEffect(() => {
    if (!interactive) hoverCountRef.current = 0
    syncCursor()
    return () => {
      gl.domElement.style.cursor = 'auto'
    }
  }, [gl, interactive, syncCursor])

  return (
    <group>
      {destinations.map((item) => (
        <Destination
          key={item.id}
          id={item.id}
          label={item.label}
          position={getDestinationPosition(item, compact)}
          geometryType={item.geometryType}
          visualScale={item.visualScale ?? 1}
          labelOffset={getDestinationLabelOffset(item, compact)}
          hitRadius={item.hitRadius}
          selected={selectedId === item.id}
          dimmed={Boolean(selectedId) && selectedId !== item.id}
          interactive={interactive}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
          onHoverChange={handleHoverChange}
        />
      ))}
    </group>
  )
}

export default Destinations
