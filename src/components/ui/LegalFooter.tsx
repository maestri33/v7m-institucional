import { COPYRIGHT_LINE } from '../../lib/footer'

export function LegalFooter() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="container py-8 text-center text-sm text-[var(--text-secondary)]"
      aria-label="Direitos autorais"
    >
      <p>{COPYRIGHT_LINE(year)}</p>
    </footer>
  )
}