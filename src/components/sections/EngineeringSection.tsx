import { motion } from 'framer-motion'
import {
  Building2,
  ClipboardCheck,
  Construction,
  HardHat,
  Ruler,
  Zap,
} from 'lucide-react'
import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

const services = [
  {
    icon: Ruler,
    title: 'Projetos civis',
    description:
      'Plantas, dimensionamento e viabilidade técnica para obras residenciais, comerciais e industriais.',
  },
  {
    icon: Construction,
    title: 'Execução de obras',
    description:
      'Gestão de obra, mão de obra qualificada e fiscalização para entregas dentro do prazo e orçamento.',
  },
  {
    icon: Zap,
    title: 'Projetos elétricos',
    description:
      'Elaboração de projetos elétricos de baixa e média tensão com conformidade técnica e segurança.',
  },
  {
    icon: HardHat,
    title: 'Instalações e manutenções',
    description:
      'Montagem, manutenção preventiva e corretiva de instalações elétricas e sistemas prediais.',
  },
  {
    icon: ClipboardCheck,
    title: 'Laudos técnicos',
    description:
      'Pareceres, laudos de inspeção e atestados de capacidade técnica para órgãos e licitações.',
  },
  {
    icon: Building2,
    title: 'Consultoria especializada',
    description:
      'Assessoria em infraestrutura, regularização, compatibilização de projetos e sustentabilidade operacional.',
  },
]

const stats = [
  { value: '+120', label: 'projetos entregues' },
  { value: '+80', label: 'obras executadas' },
  { value: '+25', label: 'anos de experiência' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export default function EngineeringSection() {
  return (
    <Section id="engenharia" ariaLabelledBy="engineering-title" className="py-20">
      <motion.div
        className="w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2
            id="engineering-title"
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Engenharia <span className="text-gradient">Civil & Elétrica</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Projetos, execução e consultoria técnica com capacidade real de operação para viabilizar obras e infraestrutura de segurança.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <LiquidGlass className="h-full p-6 md:p-8 flex flex-col">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(205,157,88,0.12)] border border-[rgba(205,157,88,0.2)]">
                  <service.icon className="w-6 h-6 text-[var(--accent-primary)]" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  {service.description}
                </p>
              </LiquidGlass>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12 md:mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-[var(--text-secondary)] uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--accent-primary)] text-[var(--near-black)] font-semibold text-lg transition-all hover:bg-[var(--accent-secondary)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
          >
            Solicitar orçamento
          </a>
        </motion.div>
      </motion.div>
    </Section>
  )
}
