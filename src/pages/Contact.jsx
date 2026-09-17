import PageFrame from '../components/portfolio/PageFrame'
import SectionHeader from '../components/portfolio/SectionHeader'
import { contact } from '../data/contact'
import styles from './Contact.module.css'

function ContactRow({ label, children }) {
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function Contact() {
  return (
    <PageFrame>
      <SectionHeader kicker="Reach out" title="Contact">
        <p>The shortest path is email. Profiles will land here as they are ready.</p>
      </SectionHeader>

      <dl className={styles.list}>
        <ContactRow label="Email">
          <a className={styles.link} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </ContactRow>
        <ContactRow label="LinkedIn">
          {contact.linkedinHref ? (
            <a
              className={styles.link}
              href={contact.linkedinHref}
              target="_blank"
              rel="noreferrer"
            >
              {contact.linkedinLabel}
            </a>
          ) : (
            <span className={styles.pending}>Profile link coming soon</span>
          )}
        </ContactRow>
        <ContactRow label="GitHub">
          {contact.githubHref ? (
            <a
              className={styles.link}
              href={contact.githubHref}
              target="_blank"
              rel="noreferrer"
            >
              {contact.githubLabel}
            </a>
          ) : (
            <span className={styles.pending}>Profile link coming soon</span>
          )}
        </ContactRow>
        <ContactRow label="Location">
          {contact.location}
          {contact.relocation ? (
            <span className={styles.note}> · {contact.relocation}</span>
          ) : null}
        </ContactRow>
      </dl>
    </PageFrame>
  )
}

export default Contact
