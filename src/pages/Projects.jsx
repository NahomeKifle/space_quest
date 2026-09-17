import styles from './Projects.module.css'

const placeholders = [
  {
    title: 'Project Alpha',
    summary: 'A placeholder for a product I designed and built end to end.',
  },
  {
    title: 'Project Beta',
    summary: 'A placeholder for a systems or tooling project.',
  },
  {
    title: 'Project Gamma',
    summary: 'A placeholder for an experimental or open-source piece of work.',
  },
]

function Projects() {
  return (
    <section className={styles.page}>
      <h1>Projects</h1>
      <p>
        Selected work will live here. These cards are placeholders so the page
        and navigation can be reviewed.
      </p>
      <ul className={styles.list}>
        {placeholders.map((project) => (
          <li key={project.title} className={styles.card}>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
