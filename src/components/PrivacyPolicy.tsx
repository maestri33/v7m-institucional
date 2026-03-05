const LAST_UPDATED = '05/03/2026'

export default function PrivacyPolicy() {
  return (
    <section className="container legal-page" aria-labelledby="privacy-title">
      <h1 id="privacy-title">Politica de Privacidade</h1>

      <div className="legal-content">
        <p>
          Esta Politica de Privacidade descreve como coletamos, usamos, armazenamos e protegemos dados pessoais ao interagir com o site <strong>v7m.org</strong>.
        </p>

        <div>
          <h2>1. Coleta de dados</h2>
          <p>
            Podemos coletar nome, email e mensagem informados voluntariamente em formularios de contato.
          </p>
        </div>

        <div>
          <h2>2. Uso dos dados</h2>
          <ul>
            <li>Responder solicitacoes institucionais e comerciais.</li>
            <li>Melhorar experiencia de uso do site.</li>
            <li>Cumprir obrigacoes legais e regulatorias.</li>
          </ul>
        </div>

        <div>
          <h2>3. Compartilhamento</h2>
          <p>
            A V7M nao vende nem aluga dados pessoais. O compartilhamento ocorre apenas quando necessario para operacoes internas ou exigencias legais.
          </p>
        </div>

        <div>
          <h2>4. Seguranca</h2>
          <p>
            Adotamos medidas tecnicas e organizacionais para proteger dados contra acesso nao autorizado, alteracao, divulgacao ou destruicao indevida.
          </p>
        </div>

        <div>
          <h2>5. Direitos do titular</h2>
          <p>
            Voce pode solicitar acesso, correcao ou exclusao de dados pessoais pelos canais de contato oficiais da V7M.
          </p>
        </div>

        <p className="legal-updated">
          <strong>Ultima atualizacao:</strong> {LAST_UPDATED}
        </p>
      </div>
    </section>
  )
}
