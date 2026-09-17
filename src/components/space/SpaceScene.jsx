import { useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import useNarrowViewport from '../../hooks/useNarrowViewport'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import CameraRig from './CameraRig'
import Destinations from './Destinations'
import { destinations } from './destinationData'
import SpaceEffects from './SpaceEffects'
import SpaceEnvironment from './SpaceEnvironment'
import Spaceship from './Spaceship'
import TravelController from './TravelController'
import { ENTER_TRANSITION_MS, SHIP_START_POSITION } from './travelConfig'
import styles from './SpaceScene.module.css'

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
      position: new Vector3(...selected.position),
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
          onPointerMissed={handleMiss}
        >
          <CameraRig
            shipRef={shipRef}
            targetRef={targetRef}
            phaseRef={phaseRef}
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
            selectedId={selectedId}
            interactive={!travelLocked}
            reducedMotion={reducedMotion}
            onSelect={handleSelect}
          />
          <SpaceEffects compact={compact} />
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
            <p className={styles.panelCopy}>The ship holds position nearby.</p>
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
