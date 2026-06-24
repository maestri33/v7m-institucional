import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function TechSection() {
  return (
    <Section id="tech" ariaLabelledBy="tech-title">
      <LiquidGlass className="max-w-3xl p-8 md:p-12 text-center">
        <h2 id="tech-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Programação & <span className="text-gradient">IA</span>
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Automação de processos, integrações e soluções inteligentes com IA para escalar operações com eficiência.
        </p>
      </LiquidGlass>
    </Section>
  )
}
