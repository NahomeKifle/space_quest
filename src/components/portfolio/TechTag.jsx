import styles from './TechTag.module.css'

function TechTag({ children }) {
  return <li className={styles.tag}>{children}</li>
}

export default TechTag
