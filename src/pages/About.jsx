import PageFrame from '../components/portfolio/PageFrame'
import SectionHeader from '../components/portfolio/SectionHeader'
import styles from './About.module.css'

function About() {
  return (
    <PageFrame>
      <SectionHeader kicker="Background" title="About">
        <p>
          I like the parts of a system that stay useful after the demo: data
          models, APIs, pipelines, and the quiet infrastructure that keeps a
          product honest.
        </p>
      </SectionHeader>

      <section className={styles.block}>
        <h2>Work</h2>
        <p>
          I care about backend systems, databases, cloud, automation, and
          system design. I like building software people can actually use —
          especially when the problem is messy on the way in and needs to come
          out clear.
        </p>
        <p>
          I currently work at American Express in Phoenix. Before that I spent
          time at IBM Federal and at VCU Health Hub, moving real data from
          collection to something a team can act on.
        </p>
      </section>

      <section className={styles.block}>
        <h2>Otherwise</h2>
        <p>
          Away from the keyboard I play soccer, play violin, and travel when
          I can. The rest of the leftover hours usually go back into learning
          and building.
        </p>
      </section>
    </PageFrame>
  )
}

export default About
