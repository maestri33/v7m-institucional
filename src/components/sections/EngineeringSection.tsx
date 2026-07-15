import { Section } from '../ui/Section'
import { BlueprintSVG } from '../ui/BlueprintSVG'

const SERVICES = [
  'Projetos civis',
  'Execução de obras',
  'Projetos elétricos',
  'Instalações e manutenções',
  'Laudos técnicos',
  'Consultoria',
] as const

export default function EngineeringSection() {
  return (
    <Section id="engenharia" ariaLabelledBy="eng-title" className="text-center md:text-left">
      {/* Blueprint decorativo à direita */}
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 h-[86%] w-auto opacity-50 pointer-events-none hidden md:block">
        <BlueprintSVG className="h-full w-auto" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto md:mx-0">
        <div
          className="text-xs font-semibold tracking-[0.38em] uppercase text-[var(--accent-primary)] mb-5"
          style={{ animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}
        >
          04 · Engenharia Civil &amp; Elétrica
        </div>

        <h2
          id="eng-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.28s both' }}
        >
          Do projeto
          <br />
          <span className="text-gradient">à entrega.</span>
        </h2>

        <p
          className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}
        >
          Projetos, execução, laudos e consultoria — civil e elétrica com conformidade técnica e capacidade real de operação.
        </p>

        <div
          className="flex flex-wrap gap-2 max-w-xl mb-9"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.52s both' }}
        >
          {SERVICES.map((s) => (
            <span
              key={s}
              className="text-sm text-[var(--text-secondary)] border border-[rgba(255,255,255,0.12)] bg-[rgba(15,15,15,0.72)] rounded-full px-4 py-2"
            >
              {s}
            </span>
          ))}
        </div>

        <a
          href="#contato"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-8 py-3.5 text-sm md:text-base font-semibold text-[var(--bg-primary)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.64s both' }}
        >
          Solicitar orçamento
        </a>
      </div>
    </Section>
  )
}
