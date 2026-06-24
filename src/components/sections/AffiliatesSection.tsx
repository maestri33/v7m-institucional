import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function AffiliatesSection() {
  return (
    <Section id="afiliados" ariaLabelledBy="affiliates-title">
      <LiquidGlass className="max-w-3xl p-8 md:p-12 text-center">
        <h2 id="affiliates-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Rede de <span className="text-gradient">Afiliados</span>
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Conectamos parceiros a oportunidades de renda recorrenta através da venda de cursos e produtos educacionais.
        </p>
      </LiquidGlass>
    </Section>
  )
}
