import Destination from './Destination'
import { destinations } from './destinations'

function Destinations({ selectedId, onSelect }) {
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
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

export default Destinations
