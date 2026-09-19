export const destinations = [
  {
    id: 'projects',
    label: 'Projects',
    route: '/projects',
    position: [-5.4, -0.55, -6.8],
    compactOffset: [1.4, -0.1, 1.6],
    geometryType: 'ringed',
    labelOffset: [0, -1.62, 0],
    compactLabelOffset: [0, -1.42, 0],
    hitRadius: 1.55,
    description: 'Selected work and things I have built.',
  },
  {
    id: 'experience',
    label: 'Experience',
    route: '/experience',
    position: [6.4, 0.4, -11.0],
    compactOffset: [-1.2, 0.05, 2.2],
    geometryType: 'station',
    labelOffset: [0, 1.58, 0],
    compactLabelOffset: [0, 1.35, 0],
    hitRadius: 1.18,
    description: 'Roles, teams, and the work behind them.',
  },
  {
    id: 'resume',
    label: 'Resume',
    route: '/resume',
    position: [0.6, 3.1, -16.5],
    compactOffset: [1.2, -0.6, 5.0],
    geometryType: 'orb',
    labelOffset: [0, 0.92, 0],
    compactLabelOffset: [0.85, 0.15, 0],
    hitRadius: 1.38,
    description: 'A concise record of skills and history.',
  },
  {
    id: 'about',
    label: 'About',
    route: '/about',
    position: [-7.2, 0.35, -14.2],
    compactOffset: [8.8, 0.05, 3.8],
    geometryType: 'crystal',
    labelOffset: [1.25, 0.15, 0],
    compactLabelOffset: [0, 1.15, 0],
    hitRadius: 1.42,
    description: 'Who I am and how I like to work.',
  },
  {
    id: 'contact',
    label: 'Contact',
    route: '/contact',
    position: [5.8, -0.95, -3.8],
    compactOffset: [-1.8, 0.15, 0.6],
    geometryType: 'ring',
    labelOffset: [0, 0.88, 0],
    compactLabelOffset: [0, 0.78, 0],
    hitRadius: 1.05,
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
