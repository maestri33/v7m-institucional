const LAST_UPDATED = '05/03/2026'

export default function PrivacyPolicy() {
  return (
    <section className="container legal-page" aria-labelledby="privacy-title">
      <h1 id="privacy-title">Política de Privacidade</h1>

      <div className="legal-content">
        <p>
          Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos dados pessoais ao interagir com o site <strong>v7m.org</strong>.
        </p>

        <div>
          <h2>1. Coleta de dados</h2>
          <p>
            Podemos coletar nome, email e mensagem informados voluntariamente em formulários de contato.
          </p>
        </div>

        <div>
          <h2>2. Uso dos dados</h2>
          <ul>
            <li>Responder solicitações institucionais e comerciais.</li>
            <li>Melhorar experiência de uso do site.</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
        </div>

        <div>
          <h2>3. Compartilhamento</h2>
          <p>
            A V7M não vende nem aluga dados pessoais. O compartilhamento ocorre apenas quando necessário para operações internas ou exigências legais.
          </p>
        </div>

        <div>
          <h2>4. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger dados contra acesso não autorizado, alteração, divulgação ou destruição indevida.
          </p>
        </div>

        <div>
          <h2>5. Direitos do titular</h2>
          <p>
            Você pode solicitar acesso, correção ou exclusão de dados pessoais pelos canais de contato oficiais da V7M.
          </p>
        </div>

        <p className="legal-updated">
          <strong>Última atualização:</strong> {LAST_UPDATED}
        </p>
      </div>
    </section>
  )
}
