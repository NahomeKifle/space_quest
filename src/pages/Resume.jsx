import styles from './Resume.module.css'

function Resume() {
  return (
    <section className={styles.page}>
      <h1>Resume</h1>
      <p>
        A downloadable resume and a readable summary will live on this page.
        For Phase 1, this is a placeholder so the route can be tested.
      </p>
      <p className={styles.note}>Resume file coming soon.</p>
    </section>
  )
}

export default Resume
