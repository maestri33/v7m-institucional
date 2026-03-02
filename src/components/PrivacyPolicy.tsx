export default function PrivacyPolicy() {
    return (
        <section className="container" style={{ padding: '8rem 0 4rem 0', color: 'var(--text-secondary)', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white' }}>Políticas de Privacidade</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
                <p>
                    A privacidade e a segurança dos seus dados são fundamentais para a <strong>V7M</strong>. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao interagir com o site <strong>v7m.org</strong> e nossas estruturas de operação.
                </p>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>1. Coleta de Informações</h2>
                    <p>
                        Coletamos informações pessoais que você nos fornece de forma voluntária ao preencher formulários de contato em nosso site, tais como nome completo, endereço de e-mail profissional e o teor da sua mensagem.
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>2. Uso das Informações</h2>
                    <p>
                        As informações coletadas são utilizadas exclusivamente para:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>Responder a suas consultas de parceria, contato institucional ou suporte operacional;</li>
                        <li>Melhorar a experiência do usuário em nossas plataformas;</li>
                        <li>Cumprir obrigações legais e regulatórias atreladas às nossas operações.</li>
                    </ul>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>3. Compartilhamento de Dados</h2>
                    <p>
                        A V7M <strong>não vende, aluga ou compartilha</strong> suas informações pessoais com terceiros para fins de marketing. Seus dados podem ser referenciados internamente entre as áreas de Educação, Tecnologia e Engenharia estritamente para o andamento das operações ou para suportar Polos Educacionais.
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>4. Segurança dos Dados</h2>
                    <p>
                        Implementamos medidas técnicas e organizacionais adequadas em nossa infraestrutura cibernética e de nuvem para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>5. Seus Direitos</h2>
                    <p>
                        Você tem o direito de solicitar acesso, correção ou exclusão de seus dados pessoais armazenados em nossas bases. Para exercer esses direitos, entre em contato conosco através dos canais disponibilizados em nosso site.
                    </p>
                </div>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
                    <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>
        </section>
    );
}
