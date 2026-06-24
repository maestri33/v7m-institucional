import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function CareersFooterSection() {
  const year = new Date().getFullYear()

  return (
    <Section id="carreiras" ariaLabelledBy="careers-title" className="text-center">
      <LiquidGlass className="max-w-3xl p-8 md:p-12 mb-8">
        <h2 id="careers-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Trabalhe na <span className="text-gradient">V7M</span>
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Junte-se a uma estrutura operacional multidisciplinar. Vagas em educação, tecnologia e engenharia em breve.
        </p>
      </LiquidGlass>

      <footer className="text-sm text-[var(--text-secondary)]">
        <p>&copy; {year} v7m.org. Todos os direitos reservados.</p>
      </footer>
    </Section>
  )
}
