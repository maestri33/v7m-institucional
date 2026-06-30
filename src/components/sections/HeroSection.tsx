import { ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function HeroSection() {
  return (
    <Section id="home" ariaLabelledBy="hero-title" className="text-center">
      <LiquidGlass className="w-full max-w-4xl p-6 sm:p-8 md:p-12">
        <h1
          id="hero-title"
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 break-words"
        >
          Estrutura para <span className="text-gradient">Executar</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8 break-words">
          A V7M organiza, implanta e sustenta operações em educação, tecnologia aplicada e engenharia.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#educacao"
            aria-label="Conheça nossas operações — ir para a seção Educação"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm md:text-base font-semibold text-[var(--near-black)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          >
            Nossas Operações
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#contato"
            aria-label="Falar com a V7M — ir para a seção Contato"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-6 py-3 text-sm md:text-base font-medium text-[var(--text-primary)] backdrop-blur transition hover:border-[var(--accent-primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          >
            Falar com a V7M
          </a>
        </div>
      </LiquidGlass>
    </Section>
  )
}
