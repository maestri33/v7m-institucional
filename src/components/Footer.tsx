export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            background: '#020202',
            padding: '4rem 0 2rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/logo.svg" alt="V7M Logo" style={{ height: '48px', width: 'auto' }} />
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.05em', margin: 0 }}>
                            v7m<span style={{ color: 'var(--accent-primary)' }}>.org</span>
                        </h2>
                    </div>

                    <ul style={{ display: 'flex', gap: '2rem' }}>
                        <li><a href="#sobre" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Estrutura</a></li>
                        <li><a href="#atuacao" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Pilares</a></li>
                        <li><a href="#contato" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Contato</a></li>
                    </ul>

                    <div style={{
                        marginTop: '2rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem'
                    }}>
                        <p>&copy; {year} v7m.org. Todos os direitos reservados.</p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="#termos" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Termos de Uso</a>
                            <a href="#privacidade" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Políticas de Privacidade</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
