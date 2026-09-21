import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Vector3 } from 'three'
import useNarrowViewport from '../../hooks/useNarrowViewport'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import CameraRig from './CameraRig'
import Destinations from './Destinations'
import { destinations, getDestinationPosition } from './destinationData'
import {
  GLTF_EXPERIENCE_DOME,
  GLTF_PLANET_ABOUT,
  GLTF_PLANET_PROJECTS,
  GLTF_SPITFIRE,
} from './gltfAssets'
import SpaceEnvironment from './SpaceEnvironment'
import Spaceship from './Spaceship'
import TravelController from './TravelController'
import { ENTER_TRANSITION_MS, SHIP_START_POSITION } from './travelConfig'
import styles from './SpaceScene.module.css'

function CanvasSizeSync() {
  const gl = useThree((state) => state.gl)
  const setSize = useThree((state) => state.setSize)
  const last = useRef({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const host =
      gl.domElement.closest('[role="region"]') || gl.domElement.parentElement
    if (!host) return undefined

    function apply() {
      const rect = host.getBoundingClientRect()
      const width = Math.round(rect.width)
      const height = Math.round(rect.height)
      if (width < 2 || height < 2) return
      if (
        Math.abs(last.current.width - width) < 2 &&
        Math.abs(last.current.height - height) < 2
      ) {
        return
      }
      last.current = { width, height }
      setSize(width, height, rect.top, rect.left)
    }

    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(host)
    window.addEventListener('resize', apply)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', apply)
    }
  }, [gl, setSize])

  return null
}

function SpaceScene({ onEnterDestination }) {
  const reducedMotion = usePrefersReducedMotion()
  const compact = useNarrowViewport()
  const [selectedId, setSelectedId] = useState(null)
  const [phase, setPhase] = useState('idle')
  const shipRef = useRef(null)
  const phaseRef = useRef(phase)
  const targetRef = useRef(null)
  const enterLockRef = useRef(false)
  const enterTimerRef = useRef(null)

  const selected =
    destinations.find((item) => item.id === selectedId) ?? null
  const travelLocked =
    phase === 'rotating' ||
    phase === 'traveling' ||
    phase === 'arrived' ||
    phase === 'entering'

  const changePhase = useCallback((next) => {
    if (phaseRef.current === next) return
    phaseRef.current = next
    setPhase(next)
  }, [])

  useEffect(() => {
    useGLTF.preload(GLTF_SPITFIRE)
    useGLTF.preload(GLTF_PLANET_PROJECTS)
    useGLTF.preload(GLTF_PLANET_ABOUT)
    useGLTF.preload(GLTF_EXPERIENCE_DOME)
  }, [])

  useLayoutEffect(() => {
    const ids = [0, 80, 320].map((ms) =>
      window.setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, ms)
    )
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [])

  useEffect(() => {
    return () => {
      if (enterTimerRef.current !== null) {
        window.clearTimeout(enterTimerRef.current)
      }
    }
  }, [])

  function handleSelect(id) {
    if (travelLocked) return
    setSelectedId(id)
    changePhase('selected')
  }

  function handleMiss() {
    if (travelLocked) return
    setSelectedId(null)
    targetRef.current = null
    changePhase('idle')
  }

  function handleTravel() {
    if (!selected || phase !== 'selected') return
    targetRef.current = {
      id: selected.id,
      label: selected.label,
      route: selected.route,
      position: new Vector3(...getDestinationPosition(selected, compact)),
    }
    changePhase('rotating')
  }

  function handleEnter() {
    if (phase !== 'arrived' || !selected?.route || enterLockRef.current) return

    enterLockRef.current = true
    changePhase('entering')

    enterTimerRef.current = window.setTimeout(() => {
      enterTimerRef.current = null
      onEnterDestination(selected.route)
    }, reducedMotion ? 80 : ENTER_TRANSITION_MS)
  }

  return (
    <>
      <div
        className={styles.scene}
        role="region"
        aria-label="Interactive space destinations"
      >
        <Canvas
          camera={{ fov: 42, near: 0.1, far: 400, position: [0, 3.6, 7.4] }}
          dpr={compact ? [1, 1.25] : [1, 2]}
          gl={{ antialias: !compact, alpha: false }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl, setSize }) => {
            const host =
              gl.domElement.closest('[role="region"]') || gl.domElement.parentElement
            if (!host) return
            const rect = host.getBoundingClientRect()
            const width = Math.round(rect.width)
            const height = Math.round(rect.height)
            if (width < 2 || height < 2) return
            setSize(width, height, rect.top, rect.left)
          }}
          onPointerMissed={handleMiss}
        >
          <CanvasSizeSync />
          <CameraRig
            shipRef={shipRef}
            targetRef={targetRef}
            phaseRef={phaseRef}
            compact={compact}
          />
          <TravelController
            shipRef={shipRef}
            phaseRef={phaseRef}
            targetRef={targetRef}
            onPhaseChange={changePhase}
          />
          <SpaceEnvironment compact={compact} reducedMotion={reducedMotion} />
          <group ref={shipRef} position={SHIP_START_POSITION}>
            <Spaceship
              idle={phase === 'idle' || phase === 'selected'}
              reducedMotion={reducedMotion}
            />
          </group>
          <Destinations
            destinations={destinations}
            compact={compact}
            selectedId={selectedId}
            interactive={!travelLocked}
            reducedMotion={reducedMotion}
            onSelect={handleSelect}
          />
        </Canvas>
        {selected && phase === 'selected' ? (
          <aside className={styles.panel} aria-live="polite">
            <p className={styles.panelKicker}>Destination</p>
            <h2 className={styles.panelTitle}>{selected.label}</h2>
            <p className={styles.panelCopy}>{selected.description}</p>
            <button type="button" className={styles.travel} onClick={handleTravel}>
              Travel
            </button>
          </aside>
        ) : null}
        {selected && (phase === 'rotating' || phase === 'traveling') ? (
          <aside className={styles.panel} aria-live="polite">
            <p className={styles.panelKicker}>En route</p>
            <h2 className={styles.panelTitle}>{selected.label}</h2>
            <p className={styles.panelCopy}>Holding course.</p>
          </aside>
        ) : null}
        {selected && phase === 'arrived' ? (
          <aside className={styles.panel} aria-live="polite">
            <p className={styles.panelKicker}>Arrived at</p>
            <h2 className={styles.panelTitle}>{selected.label}</h2>
            <p className={styles.panelCopy}>Enter to open this section.</p>
            <button type="button" className={styles.travel} onClick={handleEnter}>
              Enter
            </button>
          </aside>
        ) : null}
      </div>
      <div
        className={
          phase === 'entering' ? `${styles.fade} ${styles.fadeActive}` : styles.fade
        }
        style={{
          transitionDuration: reducedMotion ? '80ms' : `${ENTER_TRANSITION_MS}ms`,
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default SpaceScene
