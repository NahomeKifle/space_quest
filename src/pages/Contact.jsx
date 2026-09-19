import PageFrame from '../components/portfolio/PageFrame'
import SectionHeader from '../components/portfolio/SectionHeader'
import { contact, hasRealEmail } from '../data/contact'
import styles from './Contact.module.css'

function ContactRow({ label, children }) {
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function ExternalLink({ href, children }) {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

function Contact() {
  const email = hasRealEmail(contact.email) ? contact.email : ''
  const hasReachable =
    Boolean(email) || Boolean(contact.linkedinHref) || Boolean(contact.githubHref)

  return (
    <PageFrame>
      <SectionHeader kicker="Reach out" title="Contact">
        <p>
          {`Based in ${contact.location}${
            contact.relocation ? `, and ${contact.relocation.toLowerCase()}` : ''
          }.`}
          {contact.githubHref && !email && !contact.linkedinHref
            ? ' GitHub is the best way to reach me right now.'
            : ''}
        </p>
      </SectionHeader>

      <dl className={styles.list}>
        {email ? (
          <ContactRow label="Email">
            <a className={styles.link} href={`mailto:${email}`}>
              {email}
            </a>
          </ContactRow>
        ) : null}
        {contact.linkedinHref ? (
          <ContactRow label="LinkedIn">
            <ExternalLink href={contact.linkedinHref}>
              {contact.linkedinLabel}
            </ExternalLink>
          </ContactRow>
        ) : null}
        {contact.githubHref ? (
          <ContactRow label="GitHub">
            <ExternalLink href={contact.githubHref}>
              {contact.githubLabel}
            </ExternalLink>
          </ContactRow>
        ) : null}
        {!hasReachable ? (
          <ContactRow label="Contact">
            <span className={styles.pending}>Contact information coming soon</span>
          </ContactRow>
        ) : null}
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
