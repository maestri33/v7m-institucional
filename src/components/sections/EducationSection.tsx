import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function EducationSection() {
  return (
    <Section id="educacao" ariaLabelledBy="education-title">
      <LiquidGlass className="max-w-3xl p-8 md:p-12 text-center">
        <h2 id="education-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Educação <span className="text-gradient">EAD</span>
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Polos presenciais e cursos online que ampliam o acesso à educação com infraestrutura operacional própria.
        </p>
      </LiquidGlass>
    </Section>
  )
}
