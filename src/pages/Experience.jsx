import styles from './Experience.module.css'

const roles = [
  {
    title: 'Software Engineer',
    place: 'Company Name',
    dates: '2023 — Present',
    summary: 'Placeholder for current role, impact, and the stack I work with.',
  },
  {
    title: 'Software Engineering Intern',
    place: 'Another Company',
    dates: '2022 — 2023',
    summary: 'Placeholder for an earlier role and the work I contributed to.',
  },
]

function Experience() {
  return (
    <section className={styles.page}>
      <h1>Experience</h1>
      <p>
        Professional history will be listed here. The entries below are
        placeholders.
      </p>
      <ol className={styles.list}>
        {roles.map((role) => (
          <li key={role.title} className={styles.item}>
            <h2>{role.title}</h2>
            <p className={styles.meta}>
              {role.place} · {role.dates}
            </p>
            <p>{role.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Experience
