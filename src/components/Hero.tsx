import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="container hero-content">
        <h1 id="hero-title" className="hero-title">
          Estrutura para <span className="text-gradient">Executar</span>
        </h1>

        <p className="hero-description">
          A V7M é uma estrutura operacional dedicada a organizar, implantar e sustentar operações nas áreas de <strong>Educação</strong>, <strong>Tecnologia Aplicada</strong> e <strong>Engenharia</strong>.
        </p>

        <div className="hero-actions">
          <a href="#atuacao" className="button-primary">
            Nossas Operações <ArrowRight size={20} aria-hidden="true" />
          </a>

          <a href="#sobre" className="button-secondary glass-panel">
            Conhecer Estrutura
          </a>
        </div>
      </div>
    </section>
  )
}
