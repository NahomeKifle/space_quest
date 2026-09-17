import SpaceScene from '../space/SpaceScene'
import styles from './HomeContent.module.css'

function HomeContent() {
  return (
    <div className={styles.root}>
      <SpaceScene />
      <div className={styles.overlay}>
        <p className={styles.kicker}>Software Engineer</p>
        <h1>Building software with care and curiosity.</h1>
        <p>
          A third-person view into open space. Destinations will come later;
          for now, the ship holds position among the stars.
        </p>
      </div>
    </div>
  )
}

export default HomeContent
