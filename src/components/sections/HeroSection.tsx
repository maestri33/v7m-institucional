import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

export default function HeroSection() {
  return (
    <Section id="home" ariaLabelledBy="hero-title" className="text-center">
      <LiquidGlass className="max-w-4xl p-8 md:p-12">
        <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          Estrutura para <span className="text-gradient">Executar</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          A V7M organiza, implanta e sustenta operações em educação, tecnologia aplicada e engenharia.
        </p>
      </LiquidGlass>
    </Section>
  )
}
