import { Section } from '../ui/Section'

const STEPS = [
  { n: 1, title: 'Fale com a gente', desc: 'Conheça o programa e tire suas dúvidas.' },
  { n: 2, title: 'Receba treinamento', desc: 'Scripts e material de divulgação validado.' },
  { n: 3, title: 'Divulgue cursos e polos', desc: 'Supletivo e EAD para sua audiência ou região.' },
  { n: 4, title: 'Receba comissões', desc: 'Por cada matrícula confirmada das suas indicações.' },
] as const

export default function AffiliatesSection() {
  return (
    <Section id="afiliados" ariaLabelledBy="aff-title" className="text-center">
      <div
        className="text-xs font-semibold tracking-[0.38em] uppercase text-[var(--accent-primary)] mb-5"
        style={{ animation: 'cascade 0.6s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        02 · Rede de Afiliados
      </div>

      <h2
        id="aff-title"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-10 md:mb-12"
        style={{ animation: 'cascade 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
      >
        Indique. Converta.{' '}
        <span className="text-gradient">Receba.</span>
      </h2>

      {/* 4 cards cascade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-10 text-left">
        {STEPS.map((step, i) => {
          const isLast = step.n === 4
          return (
            <article
              key={step.n}
              className={[
                'affiliate-card relative rounded-2xl p-6 min-h-[160px] flex flex-col justify-end',
                isLast
                  ? 'border border-[rgba(205,157,88,0.35)]'
                  : 'border border-[rgba(255,255,255,0.08)]',
              ].join(' ')}
              style={{
                background: 'rgba(15,15,15,0.72)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: isLast ? '0 0 40px rgba(205,157,88,0.12)' : 'none',
                animation: `cascade 0.65s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.12}s both`,
              }}
            >
              <div
                className={[
                  'text-3xl md:text-4xl font-extrabold tracking-tight leading-none mb-3',
                  isLast ? 'text-gradient' : 'text-[rgba(205,157,88,0.25)]',
                ].join(' ')}
              >
                {step.n}
              </div>
              <div className="text-sm md:text-base font-semibold">{step.title}</div>
              <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
                {step.desc}
              </div>
            </article>
          )
        })}
      </div>

      {/* Tabela de faixas (sem números) */}
      <div
        className="max-w-3xl mx-auto mb-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] overflow-hidden"
        style={{
          animation: 'cascade 0.65s cubic-bezier(0.22,1,0.36,1) 0.68s both',
        }}
      >
        <div className="grid grid-cols-3 text-sm">
          <div className="p-4 border-b border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] font-semibold">
            Volume mensal
          </div>
          <div className="p-4 border-b border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] font-semibold col-span-2">
            Condição
          </div>

          <div className="p-4 border-t border-[rgba(255,255,255,0.04)]">1 matrícula</div>
          <div className="p-4 border-t border-[rgba(255,255,255,0.04)] col-span-2 text-[var(--text-secondary)]">
            Comissão inicial — consulte valores no cadastro.
          </div>

          <div className="p-4 border-t border-[rgba(255,255,255,0.04)]">5 a 9 matrículas</div>
          <div className="p-4 border-t border-[rgba(255,255,255,0.04)] col-span-2 text-[var(--text-secondary)]">
            Faixa intermediária — consulte valores no cadastro.
          </div>

          <div className="p-4 border-t border-[rgba(255,255,255,0.04)]">10 ou mais</div>
          <div className="p-4 border-t border-[rgba(255,255,255,0.04)] col-span-2 text-[var(--text-secondary)]">
            Faixa premium — consulte valores no cadastro.
          </div>
        </div>
      </div>

      {/* CTA + nota de honestidade */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        style={{ animation: 'cascade 0.65s cubic-bezier(0.22,1,0.36,1) 0.8s both' }}
      >
        <a
          href="#contato"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-7 py-3 text-sm md:text-base font-semibold text-[var(--bg-primary)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
        >
          Quero ser afiliado
        </a>
        <span className="text-xs text-[var(--text-secondary)]">
          Condições oficiais detalhadas no cadastro.
        </span>
      </div>
    </Section>
  )
}
