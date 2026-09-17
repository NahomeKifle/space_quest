import { useLayoutEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Destinations from './Destinations'
import { destinations } from './destinations'
import SpaceEnvironment from './SpaceEnvironment'
import Spaceship from './Spaceship'
import styles from './SpaceScene.module.css'

function SceneCamera() {
  const { camera } = useThree()

  useLayoutEffect(() => {
    camera.position.set(0, 3.6, 7.4)
    camera.lookAt(0, 0.15, -5)
  }, [camera])

  return null
}

function SpaceScene() {
  const [selectedId, setSelectedId] = useState(null)
  const selected =
    destinations.find((item) => item.id === selectedId) ?? null

  return (
    <div className={styles.scene}>
      <Canvas
        camera={{ fov: 42, near: 0.1, far: 400, position: [0, 3.6, 7.4] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onPointerMissed={() => setSelectedId(null)}
      >
        <SceneCamera />
        <SpaceEnvironment />
        <Spaceship />
        <Destinations selectedId={selectedId} onSelect={setSelectedId} />
      </Canvas>
      {selected ? (
        <aside className={styles.panel} aria-live="polite">
          <p className={styles.panelKicker}>Destination</p>
          <h2 className={styles.panelTitle}>{selected.label}</h2>
          <p className={styles.panelCopy}>{selected.description}</p>
          <button type="button" className={styles.travel}>
            Travel
          </button>
        </aside>
      ) : null}
    </div>
  )
}

export default SpaceScene
