import { cn } from '../../lib/utils'

export interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  ariaLabelledBy?: string
}

export function Section({ children, className, id, ariaLabelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        // scroll-mt-* matches the fixed header height (h-16 / md:h-20 in
        // Header.tsx). Without this, clicking an anchor like #educacao
        // scrolls the section top under the header — the heading gets
        // hidden behind the nav bar.
        'relative min-h-screen flex flex-col items-center justify-center px-5 py-16 scroll-mt-16 md:scroll-mt-20',
        className,
      )}
    >
      {children}
    </section>
  )
}
