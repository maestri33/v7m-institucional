const LAST_UPDATED = '05/03/2026'

export default function TermsOfUse() {
  return (
    <section className="container legal-page" aria-labelledby="terms-title">
      <h1 id="terms-title">Termos de Uso</h1>

      <div className="legal-content">
        <p>
          Ao acessar e utilizar o site <strong>v7m.org</strong> e servicos relacionados, voce concorda em cumprir estes Termos de Uso.
        </p>

        <div>
          <h2>1. Natureza dos servicos</h2>
          <p>
            A V7M atua como estrutura operacional para projetos de Educacao, Tecnologia Aplicada e Engenharia. Nao atuamos como fundo de investimento nem consultoria generica.
          </p>
        </div>

        <div>
          <h2>2. Propriedade intelectual</h2>
          <p>
            Conteudos do site, incluindo textos, marcas, imagens e software, pertencem a V7M ou a seus licenciadores e sao protegidos por legislacao aplicavel.
          </p>
        </div>

        <div>
          <h2>3. Uso permitido</h2>
          <ul>
            <li>E proibido uso fraudulento, enganoso ou ilegal.</li>
            <li>E proibida distribuicao de malware ou codigo malicioso.</li>
            <li>E proibida coleta nao autorizada de dados de usuarios.</li>
          </ul>
        </div>

        <div>
          <h2>4. Limitacao de responsabilidade</h2>
          <p>
            As informacoes do site possuem finalidade institucional. A V7M nao se responsabiliza por perdas decorrentes do uso indevido ou da indisponibilidade do site.
          </p>
        </div>

        <div>
          <h2>5. Alteracoes</h2>
          <p>
            A V7M pode atualizar estes Termos de Uso a qualquer momento. O uso continuado do site apos a publicacao representa concordancia com a versao vigente.
          </p>
        </div>

        <p className="legal-updated">
          <strong>Ultima atualizacao:</strong> {LAST_UPDATED}
        </p>
      </div>
    </section>
  )
}
