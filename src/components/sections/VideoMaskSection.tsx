import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function VideoMaskSection() {
  return (
    <Section id="video" ariaLabelledBy="video-title">
      <LiquidGlass className="max-w-3xl p-8 md:p-12 text-center">
        <h2 id="video-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          V7M em <span className="text-gradient">Movimento</span>
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Uma breve apresentação visual da nossa operação, parceiros e resultados.
        </p>
      </LiquidGlass>
    </Section>
  )
}
