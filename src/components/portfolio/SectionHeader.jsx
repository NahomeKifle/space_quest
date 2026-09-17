import styles from './SectionHeader.module.css'

function SectionHeader({ kicker, title, children }) {
  return (
    <header className={styles.header}>
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <h1>{title}</h1>
      {children ? <div className={styles.lede}>{children}</div> : null}
    </header>
  )
}

export default SectionHeader
