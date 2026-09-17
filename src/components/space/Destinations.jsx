import Destination from './Destination'
import { destinations } from './destinationData'

function Destinations({
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
          position={item.position}
          geometryType={item.geometryType}
          labelOffset={item.labelOffset}
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
