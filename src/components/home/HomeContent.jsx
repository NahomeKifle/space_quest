import { lazy, Suspense, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { destinations } from '../space/destinationData'
import { hasWebGL } from '../../utils/webgl'
import { SceneFallback, SceneLoading } from './ScenePlaceholder'
import SpaceErrorBoundary from './SpaceErrorBoundary'
import styles from './HomeContent.module.css'

// Lazy-load the 3D tree, not the Home route. Wrapping the route in
// Suspense previously delayed Canvas mount in a way that stalled the
// render loop during testing. Home stays mounted immediately so
// useNavigate, overlay copy, and layout remain stable.
const SpaceScene = lazy(() => import('../space/SpaceScene'))

function HomeContent() {
  const navigate = useNavigate()
  const webgl = useMemo(() => hasWebGL(), [])

  function handleEnterDestination(route) {
    navigate(route)
  }

  return (
    <div className={styles.root}>
      {webgl ? (
        <SpaceErrorBoundary fallback={<SceneFallback />}>
          <Suspense fallback={<SceneLoading />}>
            <SpaceScene onEnterDestination={handleEnterDestination} />
          </Suspense>
        </SpaceErrorBoundary>
      ) : (
        <SceneFallback />
      )}
      <div className={styles.overlay}>
        <p className={styles.kicker}>Software Engineer</p>
        <h1>Nahome Kifle</h1>
        <p>Backend systems, cloud, data, and interactive software.</p>
        <p className={styles.instruction}>Select a destination to explore.</p>
        <p className="visually-hidden">
          Destinations: {destinations.map((item) => item.label).join(', ')}.
          Use the navigation above to open a page, or select a destination in
          the scene.
        </p>
      </div>
    </div>
  )
}

export default HomeContent
