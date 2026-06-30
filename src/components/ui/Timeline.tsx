import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface TimelineStep {
  title: string
  description: string
  icon: LucideIcon
}

export interface TimelineProps {
  steps: TimelineStep[]
  className?: string
}

const easeOutQuart: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Same fix as in EducationSection / EngineeringSection: hidden state must
// keep content visible. Animation is enhancement, not a gate — otherwise
// fullpage screenshots, no-JS, and lazy IntersectionObserver failures all
// leave the section blank.
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: easeOutQuart,
    },
  },
}

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: easeOutQuart,
    },
  },
}

export function Timeline({ steps, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div
        className="absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-primary)] to-transparent md:left-1/2 md:-translate-x-px"
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />
      <motion.ol
        className="relative space-y-8 md:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {steps.map((step, index) => {
          const Icon = step.icon
          const isEven = index % 2 === 0

          return (
            <motion.li
              key={index}
              variants={itemVariants}
              className={cn(
                'relative flex items-start gap-6 md:items-center',
                isEven ? 'md:flex-row' : 'md:flex-row-reverse',
              )}
            >
              <div className="hidden md:block md:w-1/2 md:px-10" />
              <div className="absolute left-6 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--bg-secondary)] shadow-[0_0_24px_rgba(205,157,88,0.18)] md:left-1/2">
                <Icon className="h-5 w-5 text-[var(--accent-primary)]" aria-hidden="true" />
              </div>
              <div className={cn('ml-12 md:ml-0 md:w-1/2 md:px-10', isEven ? 'md:text-right' : 'md:text-left')}>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </div>
  )
}
