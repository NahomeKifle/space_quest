import TechTag from './TechTag'
import styles from './ProjectEntry.module.css'

function formatIndex(index) {
  return String(index + 1).padStart(2, '0')
}

function ProjectEntry({ project, index }) {
  const hasLinks = Boolean(project.github || project.demo)

  return (
    <article className={styles.entry}>
      <p className={styles.index} aria-hidden="true">
        {formatIndex(index)}
      </p>
      <div className={styles.body}>
        <h2>{project.title}</h2>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.stack} aria-label="Tech stack">
          {project.stack.map((item) => (
            <TechTag key={item}>{item}</TechTag>
          ))}
        </ul>
        <h3 className={styles.featuresTitle}>Engineering notes</h3>
        <ul className={styles.features}>
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        {hasLinks ? (
          <p className={styles.links}>
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export default ProjectEntry
