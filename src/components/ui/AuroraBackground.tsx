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
        'will-change-[background-position]',
        // GPU layer hint. The browser can promote the fixed bg to its own
        // composited layer, keeping background-position animation off the
        // main thread. (Tailwind v4 supports arbitrary will-change via the
        // JIT compiler when listed explicitly in @source.)
        className,
      )}
      style={{
        // Three radial gradients (was four — one was the near-black
        // backgroundColor, which is now the fill). Each radial gradient
        // is a paint operation per frame, so reducing the count directly
        // reduces paint cost on the 18s loop.
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(205, 157, 88, 0.22), transparent 45%),
          radial-gradient(circle at 80% 30%, rgba(162, 162, 162, 0.15), transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(205, 157, 88, 0.10), transparent 55%)
        `,
        backgroundColor: '#0a0a0a',
      }}
    />
  )
}
