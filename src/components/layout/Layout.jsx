import { Outlet } from 'react-router-dom'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import Navbar from './Navbar'
import styles from './Layout.module.css'

function Layout() {
  useDocumentTitle()

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
