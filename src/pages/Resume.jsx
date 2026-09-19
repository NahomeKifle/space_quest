import PageFrame from '../components/portfolio/PageFrame'
import SectionHeader from '../components/portfolio/SectionHeader'
import TechTag from '../components/portfolio/TechTag'
import { resumePdfHref, skillGroups } from '../data/resume'
import styles from './Resume.module.css'

function Resume() {
  return (
    <PageFrame>
      <SectionHeader kicker="Record" title="Resume">
        <p>A concise map of languages, systems, and tools.</p>
      </SectionHeader>

      <section className={styles.file} aria-labelledby="resume-file-heading">
        <h2 id="resume-file-heading">Resume file</h2>
        {resumePdfHref ? (
          <div className={styles.actions}>
            <a
              className={styles.button}
              href={resumePdfHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
            <a
              className={styles.button}
              href={resumePdfHref}
              download="Nahome_Kifle_Resume.pdf"
            >
              Download Resume
            </a>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <p>A PDF will live here once it is ready to share.</p>
            <p className={styles.soon}>Resume PDF coming soon</p>
          </div>
        )}
      </section>

      <section className={styles.skills} aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3>{group.label}</h3>
              <ul className={styles.tags} aria-label={group.label}>
                {group.items.map((item) => (
                  <TechTag key={item}>{item}</TechTag>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageFrame>
  )
}

export default Resume
