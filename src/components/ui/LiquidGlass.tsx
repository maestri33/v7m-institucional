import { cn } from '../../lib/utils'

export interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article' | 'section' | 'aside' | 'nav' | 'header' | 'footer' | 'main'
}

export function LiquidGlass({ children, className, as: Component = 'div' }: LiquidGlassProps) {
  return (
    <Component
      className={cn(
        'relative rounded-2xl',
        'bg-[rgba(15,15,15,0.72)]',
        'backdrop-blur-xl',
        'border border-[rgba(255,255,255,0.08)]',
        'shadow-[0_0_40px_rgba(205,157,88,0.08)]',
        className,
      )}
    >
      {children}
    </Component>
  )
}
