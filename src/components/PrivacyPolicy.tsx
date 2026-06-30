import { LiquidGlass } from './ui/LiquidGlass'

const LAST_UPDATED = '24/06/2026'

export default function PrivacyPolicy() {
  return (
    <main
      id="main-content"
      className="container legal-page"
      aria-labelledby="privacy-title"
    >
      <LiquidGlass
        as="article"
        className="max-w-4xl mx-auto px-6 py-10 md:px-10 md:py-14"
      >
        <h1
          id="privacy-title"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient mb-8"
        >
          Política de Privacidade
        </h1>

        <div className="legal-content">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos dados pessoais ao interagir com o site <strong className="text-[var(--text-primary)]">v7m.org</strong>.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              1. Coleta de dados
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Podemos coletar nome, email e mensagem informados voluntariamente em formulários de contato.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              2. Uso dos dados
            </h2>
            <ul className="list-disc pl-5 text-[var(--text-secondary)] leading-relaxed space-y-1">
              <li>Responder solicitações institucionais e comerciais.</li>
              <li>Melhorar experiência de uso do site.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              3. Compartilhamento
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              A V7M não vende nem aluga dados pessoais. O compartilhamento ocorre apenas quando necessário para operações internas ou exigências legais.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              4. Segurança
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Adotamos medidas técnicas e organizacionais para proteger dados contra acesso não autorizado, alteração, divulgação ou destruição indevida.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              5. Direitos do titular
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Você pode solicitar acesso, correção ou exclusão de dados pessoais pelos canais de contato oficiais da V7M.
            </p>
          </div>

          <p className="legal-updated text-[var(--text-secondary)] mt-4">
            <strong className="text-[var(--text-primary)]">Última atualização:</strong> {LAST_UPDATED}
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 mt-6 text-[var(--accent-gold)] hover:text-[var(--accent-silver)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <span aria-hidden="true">←</span>
            Voltar ao início
          </a>

          <nav
            aria-label="Documentos relacionados"
            className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]"
          >
            <span className="text-[var(--accent-gold)] font-semibold">Ver também:</span>
            <a
              href="/termos"
              className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-gold)] rounded"
            >
              Termos de Uso
            </a>
          </nav>
        </div>
      </LiquidGlass>
    </main>
  )
}
