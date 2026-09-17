import styles from './ExperienceItem.module.css'

function ExperienceItem({ role }) {
  const meta = [role.location, role.dates].filter(Boolean).join(' · ')

  return (
    <li className={styles.item}>
      <div className={styles.marker} aria-hidden="true" />
      <div className={styles.body}>
        <h2>{role.role}</h2>
        <p className={styles.org}>{role.org}</p>
        {meta ? <p className={styles.meta}>{meta}</p> : null}
        <ul className={styles.points}>
          {role.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default ExperienceItem
