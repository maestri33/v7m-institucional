import { BookOpen, Layers, Target } from 'lucide-react';

export default function About() {
    const cards = [
        {
            icon: <BookOpen size={32} color="var(--accent-secondary)" />,
            title: "Transformação",
            text: "Acreditamos na educação como a principal ferramenta de transformação, utilizando nossa base para expandir o acesso e o conhecimento."
        },
        {
            icon: <Layers size={32} color="var(--accent-primary)" />,
            title: "Serviço Sustentável",
            text: "Nossa estrutura técnica, tecnológica e física funciona como um instrumento a serviço de operações reais e continuadas."
        },
        {
            icon: <Target size={32} color="#f59e0b" />,
            title: "Impacto em Escala",
            text: "Utilizamos a organização estratégica e tecnologia como meios para estruturar atividades humanas e multiplicar resultados."
        }
    ];

    return (
        <section id="sobre" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nossa <span className="text-gradient">Estrutura</span></h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        A V7M não é um fundo de investimento nem uma consultoria genérica. Somos uma estrutura fundamentada para construir, manter e operar soluções sólidas que geram resultados concretos em larga escala.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {cards.map((card, index) => (
                        <div key={index} className="glass-panel" style={{
                            padding: '2.5rem',
                            transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                                {card.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{card.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
