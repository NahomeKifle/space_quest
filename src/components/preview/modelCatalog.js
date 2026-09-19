function filenameFromPath(path) {
  return path.split('/').pop() ?? path
}

function toList(modules, sortFn) {
  const items = Object.entries(modules).map(([path, url]) => ({
    url,
    filename: filenameFromPath(path),
  }))
  return sortFn ? items.sort(sortFn) : items.sort((a, b) =>
    a.filename.localeCompare(b.filename),
  )
}

function sortPlanetNames(a, b) {
  const na = Number(a.filename.match(/\d+/)?.[0] ?? 0)
  const nb = Number(b.filename.match(/\d+/)?.[0] ?? 0)
  return na - nb
}

const heroShipModules = import.meta.glob(
  '../../assets/models/hero-ships/*.gltf',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

const shipModules = import.meta.glob('../../assets/models/ships/*.gltf', {
  eager: true,
  query: '?url',
  import: 'default',
})

const planetModules = import.meta.glob('../../assets/models/planets/*.gltf', {
  eager: true,
  query: '?url',
  import: 'default',
})

const stationModules = import.meta.glob('../../assets/models/station/*.gltf', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const heroShips = toList(heroShipModules)
export const ships = toList(shipModules)
export const planets = toList(planetModules, sortPlanetNames)
export const stationParts = toList(stationModules)
