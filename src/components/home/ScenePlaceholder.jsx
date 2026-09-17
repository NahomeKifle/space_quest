import styles from './ScenePlaceholder.module.css'

function ScenePlaceholder({ message }) {
  return (
    <div className={styles.shell} role="status">
      <p className={styles.copy}>{message}</p>
      <span className={styles.mark} aria-hidden="true" />
    </div>
  )
}

export function SceneLoading() {
  return <ScenePlaceholder message="Initializing navigation..." />
}

export function SceneFallback() {
  return (
    <ScenePlaceholder message="Interactive space experience unavailable. Use the navigation above to explore the portfolio." />
  )
}
