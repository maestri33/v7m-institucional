const LAST_UPDATED = '05/03/2026'

export default function TermsOfUse() {
  return (
    <section className="container legal-page" aria-labelledby="terms-title">
      <h1 id="terms-title">Termos de Uso</h1>

      <div className="legal-content">
        <p>
          Ao acessar e utilizar o site <strong>v7m.org</strong> e serviços relacionados, você concorda em cumprir estes Termos de Uso.
        </p>

        <div>
          <h2>1. Natureza dos serviços</h2>
          <p>
            A V7M atua como estrutura operacional para projetos de Educação, Tecnologia Aplicada e Engenharia. Não atuamos como fundo de investimento nem consultoria genérica.
          </p>
        </div>

        <div>
          <h2>2. Propriedade intelectual</h2>
          <p>
            Conteúdos do site, incluindo textos, marcas, imagens e software, pertencem à V7M ou a seus licenciadores e são protegidos por legislação aplicável.
          </p>
        </div>

        <div>
          <h2>3. Uso permitido</h2>
          <ul>
            <li>É proibido uso fraudulento, enganoso ou ilegal.</li>
            <li>É proibida distribuição de malware ou código malicioso.</li>
            <li>É proibida coleta não autorizada de dados de usuários.</li>
          </ul>
        </div>

        <div>
          <h2>4. Limitação de responsabilidade</h2>
          <p>
            As informações do site possuem finalidade institucional. A V7M não se responsabiliza por perdas decorrentes do uso indevido ou da indisponibilidade do site.
          </p>
        </div>

        <div>
          <h2>5. Alterações</h2>
          <p>
            A V7M pode atualizar estes Termos de Uso a qualquer momento. O uso continuado do site após a publicação representa concordância com a versão vigente.
          </p>
        </div>

        <p className="legal-updated">
          <strong>Última atualização:</strong> {LAST_UPDATED}
        </p>
      </div>
    </section>
  )
}
