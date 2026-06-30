import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'
import { COPYRIGHT_LINE } from '../../lib/footer'

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

      <footer className="text-sm text-[var(--text-secondary)]" aria-label="Direitos autorais">
        <nav
          aria-label="Documentos legais"
          className="mb-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1"
        >
          <a
            href="#termos"
            className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] rounded"
          >
            Termos de Uso
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href="#privacidade"
            className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] rounded"
          >
            Política de Privacidade
          </a>
        </nav>
        <p>{COPYRIGHT_LINE(year)}</p>
      </footer>
    </Section>
  )
}
