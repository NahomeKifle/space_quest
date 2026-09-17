import styles from './Contact.module.css'

function Contact() {
  return (
    <section className={styles.page}>
      <h1>Contact</h1>
      <p>
        Ways to reach me will be listed here. These details are placeholders
        for navigation testing.
      </p>
      <ul className={styles.list}>
        <li>
          Email:{' '}
          <a className={styles.link} href="mailto:hello@example.com">
            hello@example.com
          </a>
        </li>
        <li>Location: Earth (for now)</li>
      </ul>
    </section>
  )
}

export default Contact
