import { useLayoutEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
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
  return (
    <div className={styles.scene}>
      <Canvas
        camera={{ fov: 42, near: 0.1, far: 400, position: [0, 3.6, 7.4] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <SceneCamera />
        <SpaceEnvironment />
        <Spaceship />
      </Canvas>
    </div>
  )
}

export default SpaceScene
