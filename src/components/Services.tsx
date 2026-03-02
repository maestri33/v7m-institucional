import { GraduationCap, Cpu, Construction } from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: <GraduationCap size={32} color="var(--accent-secondary)" />,
            title: "Educação EAD",
            description: "Implantação e operação de soluções educacionais, com foco na expansão estratégica de Supletivos através da nossa base física de polos."
        },
        {
            icon: <Cpu size={32} color="var(--accent-primary)" />,
            title: "Tecnologia e IA",
            description: "Suporte interno e gestão através de automação inteligente, IA e arquiteturas adaptadas para escala."
        },
        {
            icon: <Construction size={32} color="#10b981" />,
            title: "Engenharia e Infraestrutura",
            description: "O histórico de capacidade operacional e infraestrutura real que embasa as operações estruturais nos múltiplos pontos de atuação."
        }
    ];

    return (
        <section id="atuacao" style={{ position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Pilares <span className="text-gradient">Operacionais</span></h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
                        Três vetores fundamentais em nossa estrutura para sustentar e multiplicar projetos eficientes e contínuos.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {services.map((service, idx) => (
                        <div key={idx} className="glass-panel" style={{
                            padding: '2rem',
                            borderTop: '2px solid transparent',
                            transition: 'all var(--transition-normal)'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderTopColor = 'var(--accent-primary)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderTopColor = 'transparent';
                                e.currentTarget.style.background = 'var(--bg-glass)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>{service.icon}</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
