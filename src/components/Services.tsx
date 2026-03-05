import { Construction, Cpu, GraduationCap } from 'lucide-react'

const services = [
  {
    icon: <GraduationCap size={32} color="var(--accent-secondary)" aria-hidden="true" />,
    title: 'Educacao EAD',
    description:
      'Implantacao e operacao de solucoes educacionais com foco na expansao estrategica de supletivos atraves de base fisica de polos.',
  },
  {
    icon: <Cpu size={32} color="var(--accent-primary)" aria-hidden="true" />,
    title: 'Tecnologia e IA',
    description:
      'Suporte interno e gestao por automacao inteligente, IA e arquiteturas adaptadas para escala.',
  },
  {
    icon: <Construction size={32} color="#10b981" aria-hidden="true" />,
    title: 'Engenharia e Infraestrutura',
    description:
      'Historico de capacidade operacional e infraestrutura real que embasa operacoes estruturais nos multiplos pontos de atuacao.',
  },
]

export default function Services() {
  return (
    <section id="atuacao" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading">
          <h2 id="services-title" className="section-title">
            Pilares <span className="text-gradient">Operacionais</span>
          </h2>
          <p className="section-description">
            Tres vetores fundamentais em nossa estrutura para sustentar e multiplicar projetos eficientes e continuos.
          </p>
        </div>

        <div className="card-grid card-grid-3">
          {services.map((service) => (
            <article key={service.title} className="glass-panel info-card service-card">
              <div className="info-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
