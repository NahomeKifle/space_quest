/**
 * Edit these values when the real contact details are ready.
 * Leave linkedinHref or githubHref as an empty string to show a
 * "coming soon" placeholder instead of a fake link.
 *
 * email currently holds a dummy example.com address. It is NOT shown
 * in the UI until it is replaced with a real address.
 */
export const contact = {
  // TODO: replace with your real email. example.com addresses are treated as placeholders.
  email: 'hello@example.com',
  // TODO: e.g. 'https://www.linkedin.com/in/your-handle'
  linkedinHref: '',
  linkedinLabel: 'LinkedIn',
  // TODO: e.g. 'https://github.com/your-handle'
  githubHref: '',
  githubLabel: 'GitHub',
  location: 'Phoenix, AZ',
  relocation: 'Open to relocation',
}

export function hasRealEmail(value) {
  if (!value) return false
  return !/@example\.com$/i.test(value)
}
