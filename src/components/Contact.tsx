import { Send } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contato" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Fale com a <span className="text-gradient">V7M</span></h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
                        Entre em contato conosco para compreender ou participar das operações de infraestrutura, parceiros e expansão educacional.
                    </p>
                </div>

                <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '3rem' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Nome Completo</label>
                            <input type="text" id="name" placeholder="John Doe" style={{
                                width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-sm)',
                                color: 'white', outline: 'none', transition: 'border-color var(--transition-fast)'
                            }}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email Profissional</label>
                            <input type="email" id="email" placeholder="john@exemplo.com" style={{
                                width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-sm)',
                                color: 'white', outline: 'none', transition: 'border-color var(--transition-fast)'
                            }}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="message" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Mensagem</label>
                            <textarea id="message" rows={4} placeholder="Como podemos ajudar?" style={{
                                width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-sm)',
                                color: 'white', outline: 'none', resize: 'vertical', transition: 'border-color var(--transition-fast)'
                            }}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            ></textarea>
                        </div>

                        <button type="submit" style={{
                            background: 'var(--accent-gradient)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            transition: 'opacity var(--transition-fast)'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            Enviar Mensagem <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
