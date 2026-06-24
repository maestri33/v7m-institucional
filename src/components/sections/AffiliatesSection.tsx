import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'
import { Timeline } from '../ui/Timeline'
import { UserPlus, GraduationCap, Megaphone, Coins } from 'lucide-react'

const AFFILIATE_STEPS = [
  {
    title: 'Cadastre-se como afiliado',
    description:
      'Preencha seu cadastro gratuitamente e comece a representar a V7M em poucos minutos.',
    icon: UserPlus,
  },
  {
    title: 'Acesse treinamento e materiais',
    description:
      'Receba conteúdos, scripts e material de divulgação validado para converter vendas.',
    icon: GraduationCap,
  },
  {
    title: 'Divulgue cursos e polos',
    description:
      'Compartilhe supletivo, EAD e futuros cursos com sua audiência ou região.',
    icon: Megaphone,
  },
  {
    title: 'Receba comissões',
    description:
      'Acompanhe suas vendas e comissões competitivas pelo painel do afiliado.',
    icon: Coins,
  },
]

export default function AffiliatesSection() {
  return (
    <Section id="afiliados" ariaLabelledBy="affiliates-title">
      <div className="container flex flex-col items-center gap-10 lg:gap-14">
        <LiquidGlass className="max-w-3xl p-8 text-center md:p-12">
          <h2
            id="affiliates-title"
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Rede de <span className="text-gradient">Afiliados</span>
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
            Junte-se à rede de afiliados da V7M e ganhe comissões vendendo
            cursos supletivo, EAD e as próximas formações que lançarmos.
          </p>
        </LiquidGlass>

        <LiquidGlass className="w-full max-w-5xl p-6 md:p-10">
          <Timeline steps={AFFILIATE_STEPS} />
        </LiquidGlass>

        <LiquidGlass className="max-w-3xl p-6 md:p-10">
          <div className="grid gap-4 text-center sm:grid-cols-2 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                Comissões competitivas
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Remuneração por venda confirmada.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                Material pronto
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Imagens, textos e orientações de divulgação.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                Suporte e painel
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Acompanhamento de resultados em tempo real.
              </p>
            </div>
          </div>
          <p className="mt-6 text-xs text-[var(--text-secondary)]">
            *Benefícios e condições representativos — substituir pelas regras
            oficiais do programa de afiliados quando disponíveis.
          </p>
        </LiquidGlass>

        <a
          href="#contato"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent-primary)] px-8 py-3 font-semibold text-[var(--near-black)] transition hover:bg-[var(--accent-silver)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
        >
          Quero ser afiliado
        </a>
      </div>
    </Section>
  )
}
