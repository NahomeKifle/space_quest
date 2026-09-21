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
          interactive={interactive}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

export default Destinations
