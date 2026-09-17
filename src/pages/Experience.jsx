import ExperienceItem from '../components/portfolio/ExperienceItem'
import PageFrame from '../components/portfolio/PageFrame'
import SectionHeader from '../components/portfolio/SectionHeader'
import { experience } from '../data/experience'
import styles from './Experience.module.css'

function Experience() {
  return (
    <PageFrame>
      <SectionHeader kicker="Work" title="Experience">
        <p>
          Roles where I have written software, shaped data systems, and
          supported the people around the work.
        </p>
      </SectionHeader>
      <ol className={styles.list}>
        {experience.map((role) => (
          <ExperienceItem key={role.id} role={role} />
        ))}
      </ol>
    </PageFrame>
  )
}

export default Experience
