import SpaceScene from '../space/SpaceScene'
import styles from './HomeContent.module.css'

function HomeContent() {
  return (
    <div className={styles.root}>
      <SpaceScene />
      <div className={styles.overlay}>
        <p className={styles.kicker}>Software Engineer</p>
        <h1>Building with care.</h1>
        <p>Destinations wait in the dark. Select one to inspect it.</p>
      </div>
    </div>
  )
}

export default HomeContent
