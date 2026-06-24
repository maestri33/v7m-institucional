import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function ContactSection() {
  return (
    <Section id="contato" ariaLabelledBy="contact-title">
      <LiquidGlass className="max-w-3xl p-8 md:p-12 text-center">
        <h2 id="contact-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Fale com a <span className="text-gradient">V7M</span>
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Entre em contato para conhecer nossas operações, propor parcerias ou explorar oportunidades.
        </p>
      </LiquidGlass>
    </Section>
  )
}
