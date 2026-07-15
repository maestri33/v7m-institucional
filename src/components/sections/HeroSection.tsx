import { ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'

export default function HeroSection() {
  return (
    <Section id="home" ariaLabelledBy="hero-title" className="text-center">
      {/* Cinematic layers (kenburns) — fallback ao slot de vídeo */}
      <div
        aria-hidden="true"
        className="cinematic-layer pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 30% 65%, rgba(205,157,88,0.28), transparent 60%), radial-gradient(ellipse 50% 45% at 78% 25%, rgba(214,214,214,0.10), transparent 55%), #0a0a0a',
          animation: 'kenburnsA 22s ease-in-out infinite alternate',
        }}
      />
      <div
        aria-hidden="true"
        className="cinematic-layer pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 40% at 70% 80%, rgba(205,157,88,0.14), transparent 60%)',
          mixBlendMode: 'screen',
          animation: 'kenburnsB 30s ease-in-out infinite alternate',
        }}
      />

      {/* Slot de vídeo (placeholder, src vazio) — descomentar quando asset chegar */}
      {/* <video
        loop
        muted
        autoPlay
        playsInline
        data-src=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      /> */}

      {/* Lamp line */}
      <div
        aria-hidden="true"
        className="lamp-line pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #eedda1, transparent)',
          boxShadow: '0 0 22px 3px rgba(238,221,161,0.55)',
          animation: 'lampGrow 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s both',
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div
          className="text-[10px] sm:text-xs font-semibold tracking-[0.42em] uppercase text-[var(--accent-primary)] mb-6 md:mb-8"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
        >
          V7M · Holding Operacional
        </div>

        <h1
          id="hero-title"
          className="text-[44px] sm:text-6xl md:text-7xl lg:text-[118px] font-extrab tracking-tight leading-[0.98] mb-6 md:mb-8"
          style={{ animation: 'riseUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}
        >
          Estrutura para
          <br />
          <span className="text-gradient">Executar.</span>
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 px-2"
          style={{ animation: 'riseUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s both' }}
        >
          Supletivo e EAD reconhecidos, software com IA e engenharia civil e elétrica — tudo numa só operação.
        </p>

        {/* CTA com movingBorder */}
        <div
          className="relative inline-block rounded-full p-[1.5px] overflow-hidden"
          style={{ animation: 'riseUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both' }}
        >
          <div
            aria-hidden="true"
            className="moving-border absolute -inset-[150%]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 70%, #eedda1 86%, #cd9d58 96%, transparent 100%)',
              animation: 'movingBorder 3.2s linear infinite',
            }}
          />
          <a
            href="#educacao"
            aria-label="Conheça nossas operações — ir para a seção Educação"
            className="relative inline-flex items-center gap-2 rounded-full bg-[rgba(15,15,15,0.92)] backdrop-blur-md px-8 py-3.5 text-sm md:text-base font-semibold text-[var(--text-primary)] transition hover:bg-[rgba(30,26,18,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          >
            Conhecer as operações
            <ArrowRight size={18} className="text-[var(--accent-primary)]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  )
}
