import styles from './PageFrame.module.css'

function PageFrame({ children }) {
  return <div className={styles.frame}>{children}</div>
}

export default PageFrame
