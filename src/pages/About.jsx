import styles from './About.module.css'

function About() {
  return (
    <section className={styles.page}>
      <h1>About</h1>
      <p>
        This page will introduce who I am, how I work, and what I care about
        as a software engineer.
      </p>
      <p>
        Placeholder copy: I like building products that feel considered —
        clear in structure, quiet in presentation, and solid in the details.
      </p>
    </section>
  )
}

export default About
