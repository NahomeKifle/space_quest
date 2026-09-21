export const destinations = [
  {
    id: 'projects',
    label: 'Projects',
    route: '/projects',
    position: [-7.35, -1.42, -8.55],
    compactOffset: [1.4, -0.1, 1.6],
    geometryType: 'ringed',
    labelOffset: [0, -1.92, 0],
    compactLabelOffset: [0, -1.42, 0],
    hitRadius: 1.7,
    description: 'Selected work and things I have built.',
  },
  {
    id: 'experience',
    label: 'Experience',
    route: '/experience',
    position: [5.12, 0.62, -13.35],
    compactOffset: [-1.2, 0.05, 2.2],
    geometryType: 'station',
    labelOffset: [0, 1.42, 0],
    compactLabelOffset: [0, 1.35, 0],
    hitRadius: 1.12,
    description: 'Roles, teams, and the work behind them.',
  },
  {
    id: 'resume',
    label: 'Resume',
    route: '/resume',
    position: [4.50, 2.22, -24.10],
    compactOffset: [1.2, -0.6, 5.0],
    geometryType: 'orb',
    visualScale: 1.28,
    labelOffset: [0.9, 0.12, 0],
    compactLabelOffset: [0.85, 0.15, 0],
    hitRadius: 1.32,
    description: 'A concise record of skills and history.',
  },
  {
    id: 'about',
    label: 'About',
    route: '/about',
    position: [-1.72, 1.18, -21.30],
    compactOffset: [8.8, 0.05, 3.8],
    geometryType: 'crystal',
    labelOffset: [1.05, 0.28, 0],
    compactLabelOffset: [0, 1.15, 0],
    hitRadius: 1.32,
    description: 'Who I am and how I like to work.',
  },
  {
    id: 'contact',
    label: 'Contact',
    route: '/contact',
    position: [4.08, -1.38, -9.90],
    compactOffset: [-1.8, 0.15, 0.6],
    geometryType: 'ring',
    labelOffset: [0, 0.74, 0],
    compactLabelOffset: [0, 0.78, 0],
    hitRadius: 1.08,
    description: 'Ways to reach me.',
  },
]

export function getDestinationPosition(item, compact = false) {
  if (!compact || !item.compactOffset) return item.position
  return [
    item.position[0] + item.compactOffset[0],
    item.position[1] + item.compactOffset[1],
    item.position[2] + item.compactOffset[2],
  ]
}

export function getDestinationLabelOffset(item, compact = false) {
  if (compact && item.compactLabelOffset) return item.compactLabelOffset
  return item.labelOffset
}
