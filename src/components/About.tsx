import { BookOpen, Layers, Target } from 'lucide-react'

const cards = [
  {
    icon: <BookOpen size={32} color="var(--accent-secondary)" aria-hidden="true" />,
    title: 'Transformação',
    text: 'Acreditamos na educação como principal ferramenta de transformação, usando nossa base para expandir acesso e conhecimento.',
  },
  {
    icon: <Layers size={32} color="var(--accent-primary)" aria-hidden="true" />,
    title: 'Serviço Sustentável',
    text: 'Nossa estrutura técnica, tecnológica e física funciona como instrumento para operações reais e continuadas.',
  },
  {
    icon: <Target size={32} color="#f59e0b" aria-hidden="true" />,
    title: 'Impacto em Escala',
    text: 'Usamos organização estratégica e tecnologia para estruturar atividades humanas e multiplicar resultados.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="section-alt" aria-labelledby="about-title">
      <div className="container">
        <div className="section-heading">
          <h2 id="about-title" className="section-title">
            Nossa <span className="text-gradient">Estrutura</span>
          </h2>
          <p className="section-description">
            A V7M não é um fundo de investimento nem uma consultoria genérica. Somos uma estrutura fundamentada para construir, manter e operar soluções sólidas que geram resultados concretos em larga escala.
          </p>
        </div>

        <div className="card-grid card-grid-3">
          {cards.map((card) => (
            <article key={card.title} className="glass-panel info-card">
              <div className="info-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
