/**
 * Edit these values when the real contact details are ready.
 * Leave email or linkedinHref empty to omit that method from the UI.
 * Never put an example.com address here and expect it to show as real.
 */
export const contact = {
  // Add a real address to show a mailto link.
  email: '',
  // e.g. 'https://www.linkedin.com/in/your-handle'
  linkedinHref: '',
  linkedinLabel: 'LinkedIn',
  // Matches the GitHub account that hosts this repository.
  githubHref: 'https://github.com/NahomeKifle',
  githubLabel: 'GitHub',
  location: 'Phoenix, AZ',
  relocation: 'Open to relocation',
}

export function hasRealEmail(value) {
  if (!value) return false
  return !/@example\.com$/i.test(value)
}
