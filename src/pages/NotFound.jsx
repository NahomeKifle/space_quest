import { Link } from 'react-router-dom'
import PageFrame from '../components/portfolio/PageFrame'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <PageFrame>
      <p className={styles.kicker}>Off course</p>
      <h1>404 — Lost in space.</h1>
      <p className={styles.copy}>
        That route is not on the map. The rest of the portfolio is still
        reachable from here.
      </p>
      <Link className={styles.home} to="/">
        Return Home
      </Link>
    </PageFrame>
  )
}

export default NotFound
