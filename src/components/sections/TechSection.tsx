import { motion } from 'framer-motion'
import { Code, Bot, Cloud, Workflow, Zap, Cpu } from 'lucide-react'
import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

const services = [
  {
    title: 'Desenvolvimento de software',
    description:
      'Aplicações web, mobile e sistemas sob medida para operar com escalabilidade e segurança.',
    icon: Code,
  },
  {
    title: 'Agentes de IA e automações',
    description:
      'Agentes inteligentes que leem, decidem e executam tarefas repetitivas com supervisão humana.',
    icon: Bot,
  },
  {
    title: 'Integrações e APIs',
    description:
      'Conectamos ERPs, CRMs, gateways e plataformas legadas em uma arquitetura coesa.',
    icon: Cloud,
  },
  {
    title: 'RPA e otimização de processos',
    description:
      'Robôs de automação que reduzem erros, aceleram fluxos e liberam a equipe para o que importa.',
    icon: Workflow,
  },
]

const stats = [
  { value: '+80', label: 'projetos entregues' },
  { value: '2.4k+', label: 'horas economizadas por mês com automações' },
  { value: '24/7', label: 'agentes e monitoramento ativos' },
]

export default function TechSection() {
  return (
    <Section id="tech" ariaLabelledBy="tech-title" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(205,157,88,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(205,157,88,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <LiquidGlass className="relative z-10 w-full max-w-6xl p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(205,157,88,0.25)] bg-[rgba(205,157,88,0.08)] mb-6">
            <Cpu className="w-4 h-4 text-[var(--accent-primary)]" aria-hidden="true" />
            <span className="text-sm font-medium tracking-wide uppercase text-[var(--accent-primary)]">
              Tecnologia & Inovação
            </span>
          </div>

          <h2
            id="tech-title"
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            Programação + <span className="text-gradient">Automações com IA</span>
          </h2>

          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Desenvolvemos software, agentes de IA e integrações que sustentam as operações da V7M em
            educação, afiliados e engenharia — escalando resultados com eficiência real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 md:mb-14">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
              >
                <LiquidGlass className="h-full p-6 md:p-7 flex gap-5 items-start border-[rgba(205,157,88,0.10)] hover:shadow-[0_0_48px_rgba(205,157,88,0.14)] transition-shadow duration-300">
                  <div className="shrink-0 p-3 rounded-xl bg-[rgba(205,157,88,0.10)] border border-[rgba(205,157,88,0.18)]">
                    <Icon className="w-6 h-6 text-[var(--accent-primary)]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </LiquidGlass>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10 md:mb-12"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-4"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-[var(--text-secondary)]">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm md:text-base bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-secondary)] transition-colors duration-200 shadow-[0_0_24px_rgba(205,157,88,0.25)]"
          >
            <Zap className="w-5 h-5" aria-hidden="true" />
            Falar com o time de tecnologia
          </a>
        </motion.div>
      </LiquidGlass>
    </Section>
  )
}
