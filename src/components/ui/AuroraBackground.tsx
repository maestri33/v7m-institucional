import { cn } from '../../lib/utils'

export interface AuroraBackgroundProps {
  className?: string
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 -z-10',
        'bg-[length:200%_200%]',
        'animate-[aurora_18s_ease_infinite]',
        className,
      )}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(205, 157, 88, 0.22), transparent 40%),
          radial-gradient(circle at 80% 30%, rgba(162, 162, 162, 0.15), transparent 45%),
          radial-gradient(circle at 40% 80%, rgba(205, 157, 88, 0.12), transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(43, 43, 43, 0.4), transparent 55%)
        `,
        backgroundColor: '#0a0a0a',
      }}
    />
  )
}
