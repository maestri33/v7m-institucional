import { LiquidGlass } from './ui/LiquidGlass'

const LAST_UPDATED = '24/06/2026'

export default function TermsOfUse() {
  return (
    <main
      id="main-content"
      className="container legal-page"
      aria-labelledby="terms-title"
    >
      <LiquidGlass
        as="article"
        className="max-w-4xl mx-auto px-6 py-10 md:px-10 md:py-14"
      >
        <h1
          id="terms-title"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient mb-8"
        >
          Termos de Uso
        </h1>

        <div className="legal-content">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Ao acessar e utilizar o site <strong className="text-[var(--text-primary)]">v7m.org</strong> e serviços relacionados, você concorda em cumprir estes Termos de Uso.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              1. Natureza dos serviços
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              A V7M atua como estrutura operacional para projetos de Educação, Tecnologia Aplicada e Engenharia. Não atuamos como fundo de investimento nem consultoria genérica.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              2. Propriedade intelectual
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Conteúdos do site, incluindo textos, marcas, imagens e software, pertencem à V7M ou a seus licenciadores e são protegidos por legislação aplicável.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              3. Uso permitido
            </h2>
            <ul className="list-disc pl-5 text-[var(--text-secondary)] leading-relaxed space-y-1">
              <li>É proibido uso fraudulento, enganoso ou ilegal.</li>
              <li>É proibida distribuição de malware ou código malicioso.</li>
              <li>É proibida coleta não autorizada de dados de usuários.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              4. Limitação de responsabilidade
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              As informações do site possuem finalidade institucional. A V7M não se responsabiliza por perdas decorrentes do uso indevido ou da indisponibilidade do site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--accent-gold)] mb-2">
              5. Alterações
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              A V7M pode atualizar estes Termos de Uso a qualquer momento. O uso continuado do site após a publicação representa concordância com a versão vigente.
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
              href="/privacidade"
              className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-gold)] rounded"
            >
              Política de Privacidade
            </a>
          </nav>
        </div>
      </LiquidGlass>
    </main>
  )
}
