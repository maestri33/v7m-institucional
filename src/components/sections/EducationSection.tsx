import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Users, MapPin, School, ArrowUpRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

const features = [
  {
    icon: MapPin,
    title: 'Rede de Polos',
    description:
      'Polos presenciais espalhados estrategicamente para oferecer suporte local aos alunos da modalidade EAD.',
  },
  {
    icon: BookOpen,
    title: 'Cursos Online',
    description:
      'Plataforma digital com conteúdo organizado, acompanhamento pedagógico e flexibilidade de estudo.',
  },
  {
    icon: School,
    title: 'Supletivo',
    description:
      'Ensino médio concluído de forma ágil e reconhecida, voltado para quem precisa retomar os estudos.',
  },
  {
    icon: Users,
    title: 'Parceiros & Afiliados',
    description:
      'Rede de parceiros comercializa as matrículas e ajuda a levar a educação para mais pessoas.',
  },
]

const stats = [
  { value: '+50', label: 'polos parceiros' },
  { value: '+5.000', label: 'alunos atendidos' },
  { value: '100%', label: 'EAD' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function EducationSection() {
  return (
    <Section id="educacao" ariaLabelledBy="education-title">
      <motion.div
        className="w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <LiquidGlass className="p-8 md:p-12 lg:p-16">
          <div className="text-center mb-10 md:mb-14">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-1.5 mb-6"
            >
              <GraduationCap className="w-4 h-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">Educação EAD / Supletivo</span>
            </motion.div>

            <motion.h2
              id="education-title"
              variants={itemVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            >
              Educação <span className="text-gradient">EAD</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
            >
              Operamos uma rede de polos presenciais e cursos online para ampliar o acesso à educação.
              Hoje nosso foco é o supletivo, com planos de expansão para novas formações.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <LiquidGlass className="h-full p-6 md:p-7 text-left hover:border-[rgba(205,157,88,0.25)] transition-colors">
                  <feature.icon
                    className="w-7 h-7 text-[var(--accent-primary)] mb-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                </LiquidGlass>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 md:mb-12"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center min-w-[120px]">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-[var(--text-secondary)] max-w-xl">
              Os números acima são ilustrativos e serão atualizados conforme a consolidação da operação.
            </p>
            <a
              href="https://supletivo.net.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--near-black)] hover:bg-[#e6b978] transition-colors focus-visible:outline-offset-4"
            >
              Conheça o supletivo.net.br
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>
        </LiquidGlass>
      </motion.div>
    </Section>
  )
}
