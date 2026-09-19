import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import styles from './ModelPreview.module.css'

const TARGET_SIZE = 1.8
const MAX_ACTIVE_CANVASES = 10

let activeCanvases = 0
const waiters = []

function useCanvasSlot(wanted) {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    if (!wanted) {
      setGranted(false)
      return undefined
    }

    let grantedNow = false
    let cancelled = false
    let waiter = null

    const grant = () => {
      if (cancelled || grantedNow) return
      activeCanvases += 1
      grantedNow = true
      setGranted(true)
    }

    if (activeCanvases < MAX_ACTIVE_CANVASES) {
      grant()
    } else {
      waiter = grant
      waiters.push(waiter)
    }

    return () => {
      cancelled = true
      if (waiter) {
        const index = waiters.indexOf(waiter)
        if (index >= 0) waiters.splice(index, 1)
      }
      if (grantedNow) {
        activeCanvases = Math.max(0, activeCanvases - 1)
        setGranted(false)
        const next = waiters.shift()
        next?.()
      }
    }
  }, [wanted])

  return granted
}

function FittedModel({ url }) {
  const { scene } = useGLTF(url)
  const invalidate = useThree((state) => state.invalidate)
  const clone = useMemo(() => scene.clone(true), [scene])
  const fit = useMemo(() => {
    clone.updateMatrixWorld(true)
    const box = new Box3().setFromObject(clone)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z, 0.0001)
    return {
      scale: TARGET_SIZE / maxDim,
      position: [-center.x, -center.y, -center.z],
    }
  }, [clone])

  useLayoutEffect(() => {
    invalidate()
  }, [clone, fit, invalidate])

  return (
    <group scale={fit.scale}>
      <group position={fit.position}>
        <primitive object={clone} />
      </group>
    </group>
  )
}

class PreviewErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.fallback} role="status">
          Failed to load
        </div>
      )
    }
    return this.props.children
  }
}

function useNearViewport(ref) {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const update = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || 800
      setNear(rect.bottom > -160 && rect.top < vh + 160)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return near
}

function PreviewScene({ url }) {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.25]}
      camera={{ fov: 40, position: [0, 0.45, 3.4], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
    >
      <color attach="background" args={['#0c0d12']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3.2, 4.2, 5]} intensity={1.15} />
      <directionalLight position={[-3, 1.2, -2.4]} intensity={0.32} />
      <Suspense fallback={null}>
        <FittedModel url={url} />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={1.6}
        maxDistance={8}
      />
    </Canvas>
  )
}

function ModelPreview({ url, filename }) {
  const stageRef = useRef(null)
  const near = useNearViewport(stageRef)
  const showCanvas = useCanvasSlot(near)

  return (
    <figure className={styles.card}>
      <div ref={stageRef} className={styles.stage}>
        <PreviewErrorBoundary>
          {showCanvas ? (
            <PreviewScene url={url} />
          ) : (
            <div className={styles.fallback} aria-hidden="true" />
          )}
        </PreviewErrorBoundary>
      </div>
      <figcaption className={styles.caption}>{filename}</figcaption>
    </figure>
  )
}

export default ModelPreview
