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
        'relative min-h-screen flex flex-col items-center justify-center px-5 py-16',
        className,
      )}
    >
      {children}
    </section>
  )
}
