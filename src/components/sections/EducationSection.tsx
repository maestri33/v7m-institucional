import { GraduationCap, MapPin, BookOpen, Users } from 'lucide-react'
import { Section } from '../ui/Section'

export default function EducationSection() {
  return (
    <Section id="educacao" ariaLabelledBy="edu-title" className="text-center">
      <div
        className="text-xs font-semibold tracking-[0.38em] uppercase text-[var(--accent-primary)] mb-5"
        style={{ animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}
      >
        01 · Educação EAD / Supletivo
      </div>

      <h2
        id="edu-title"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5"
        style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.32s both' }}
      >
        Quem parou,
        <br />
        <span className="text-gradient">volta a estudar.</span>
      </h2>

      <p
        className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10 px-2"
        style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.44s both' }}
      >
        Supletivo reconhecido e EAD com polos presenciais de apoio. Educação que cabe na rotina de quem trabalha.
      </p>

      {/* Bento grid 2x2: card grande (Supletivo) + 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10 text-left">
        {/* Card grande: Supletivo (col-span 2 em sm+) */}
        <article
          className="bento-card sm:col-span-2 rounded-2xl border border-[rgba(205,157,88,0.22)] p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.5)] hover:-translate-y-1"
          style={{
            background:
              'linear-gradient(135deg, rgba(205,157,88,0.10), rgba(15,15,15,0.72) 55%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both',
          }}
        >
          <GraduationCap
            size={26}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base md:text-lg font-semibold tracking-tight">Supletivo</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Ensino médio concluído de forma ágil e reconhecida — o carro-chefe da operação.
          </div>
        </article>

        {/* Card menor: Rede de polos */}
        <article
          className="bento-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] backdrop-blur-xl p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.4)] hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both',
          }}
        >
          <MapPin
            size={22}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base font-semibold tracking-tight">Rede de polos</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Apoio presencial onde o aluno está.
          </div>
        </article>

        {/* Card menor: Cursos online */}
        <article
          className="bento-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.4)] hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.66s both',
          }}
        >
          <BookOpen
            size={22}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base font-semibold tracking-tight">Cursos online</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Plataforma com acompanhamento pedagógico.
          </div>
        </article>

        {/* Card full-width: Parceiros */}
        <article
          className="bento-card sm:col-span-2 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.4)] hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.74s both',
          }}
        >
          <Users
            size={22}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base font-semibold tracking-tight">Parceiros &amp; afiliados</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Rede que leva matrículas a mais pessoas.
          </div>
        </article>
      </div>

      {/* CTA com UTM (resolve A15 da auditoria) */}
      <a
        href="https://supletivo.net.br?utm_source=v7m.org&utm_medium=referral&utm_campaign=educacao"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-7 py-3 text-sm md:text-base font-semibold text-[var(--bg-primary)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
        style={{ animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.82s both' }}
      >
        Conheça o supletivo.net.br
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </Section>
  )
}
