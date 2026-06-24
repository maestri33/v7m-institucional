import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function EngineeringSection() {
  return (
    <Section id="engenharia" ariaLabelledBy="engineering-title">
      <LiquidGlass className="max-w-3xl p-8 md:p-12 text-center">
        <h2 id="engineering-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Engenharia <span className="text-gradient">Civil & Elétrica</span>
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Projetos e execução de obras civis e elétricas com planejamento, fiscalização e mão de obra qualificada.
        </p>
      </LiquidGlass>
    </Section>
  )
}
