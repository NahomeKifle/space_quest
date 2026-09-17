import PageFrame from '../components/portfolio/PageFrame'
import ProjectEntry from '../components/portfolio/ProjectEntry'
import SectionHeader from '../components/portfolio/SectionHeader'
import { projects } from '../data/projects'
import styles from './Projects.module.css'

function Projects() {
  return (
    <PageFrame>
      <SectionHeader kicker="Selected work" title="Projects">
        <p>
          Systems and applications I have built — backend-heavy, data-aware,
          and meant to be used.
        </p>
      </SectionHeader>
      <div className={styles.list}>
        {projects.map((project, index) => (
          <ProjectEntry key={project.id} project={project} index={index} />
        ))}
      </div>
    </PageFrame>
  )
}

export default Projects
