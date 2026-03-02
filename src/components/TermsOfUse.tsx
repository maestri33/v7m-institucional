export default function TermsOfUse() {
    return (
        <section className="container" style={{ padding: '8rem 0 4rem 0', color: 'var(--text-secondary)', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white' }}>Termos de Uso</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
                <p>
                    Bem-vindo à V7M. Ao acessar e utilizar o site <strong>v7m.org</strong> e os serviços relacionados, você concorda em cumprir e sujeitar-se a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve utilizar nosso site ou serviços.
                </p>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>1. Natureza dos Serviços</h2>
                    <p>
                        A V7M atua como uma estrutura operacional de suporte para projetos nas áreas de Educação, Tecnologia Aplicada e Engenharia. Não somos um fundo de investimento ou uma consultoria genérica. Nosso papel é implantar, operar e sustentar operações físicas e digitais (como Polos Educacionais e plataformas EAD).
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>2. Propriedade Intelectual</h2>
                    <p>
                        Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones, imagens, compilações de dados e software, é propriedade da V7M ou de seus fornecedores de conteúdo e é protegido por leis de direitos autorais internacionais.
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>3. Uso do Site</h2>
                    <p>
                        Você concorda em usar nosso site apenas para fins legais. É estritamente proibido o uso do site para:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>Qualquer finalidade enganosa, fraudulenta ou ilegal;</li>
                        <li>Distribuição de vírus, malware ou qualquer código malicioso;</li>
                        <li>Coleta não autorizada de dados de nossos usuários ou parceiros.</li>
                    </ul>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>4. Limitação de Responsabilidade</h2>
                    <p>
                        As informações contidas no site são fornecidas "como estão", para fins informativos e institucionais. A V7M não se responsabiliza por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de usar nosso site e suas informações.
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>5. Alterações nos Termos</h2>
                    <p>
                        A V7M reserva-se o direito de modificar estes Termos de Uso a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação no site. O uso contínuo do site após a publicação de alterações constitui sua aceitação dos novos termos.
                    </p>
                </div>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
                    <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>
        </section>
    );
}
