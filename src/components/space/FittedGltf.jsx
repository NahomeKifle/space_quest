import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

function disableRaycast(object) {
  object.traverse((child) => {
    if (child.isMesh) child.raycast = () => {}
  })
}

function FittedGltf({
  url,
  targetSize = 1.8,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}) {
  const { scene } = useGLTF(url)
  const clone = useMemo(() => {
    const next = scene.clone(true)
    disableRaycast(next)
    return next
  }, [scene])

  const fit = useMemo(() => {
    clone.updateMatrixWorld(true)
    const box = new Box3().setFromObject(clone)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z, 0.0001)
    return {
      scale: targetSize / maxDim,
      center: [-center.x, -center.y, -center.z],
    }
  }, [clone, targetSize])

  return (
    <group rotation={rotation} position={position}>
      <group scale={fit.scale}>
        <group position={fit.center}>
          <primitive object={clone} />
        </group>
      </group>
    </group>
  )
}

export default FittedGltf
