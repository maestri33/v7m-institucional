import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="hero-section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Background ambient glow */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'var(--accent-glow)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none',
                animation: 'pulseGlow 6s infinite alternate'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1.5rem', animation: 'fadeIn 0.8s ease-out', lineHeight: 1.1 }}>
                    Estrutura para <span className="text-gradient">Executar</span>
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 3rem auto', animation: 'fadeIn 1s ease-out 0.2s backwards', lineHeight: 1.6 }}>
                    A V7M é uma estrutura operacional dedicada a organizar, implantar e sustentar operações nas áreas de <strong>Educação</strong>, <strong>Tecnologia Aplicada</strong> e <strong>Engenharia</strong>.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', animation: 'fadeIn 1s ease-out 0.4s backwards' }}>
                    <a href="#atuacao" style={{
                        background: 'var(--accent-primary)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 14px 0 var(--accent-glow)',
                        transition: 'transform var(--transition-fast)'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Nossas Operações <ArrowRight size={20} />
                    </a>

                    <a href="#sobre" className="glass-panel" style={{
                        color: 'var(--text-primary)',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 600,
                        transition: 'background var(--transition-fast)'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-glass)'}
                    >
                        Conhecer Estrutura
                    </a>
                </div>
            </div>
        </section>
    );
}
