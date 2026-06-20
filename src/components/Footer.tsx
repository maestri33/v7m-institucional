export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-layout">
          <div className="footer-brand">
            <img src="/logo.svg" alt="" className="footer-logo" aria-hidden="true" />
            <h2 className="footer-wordmark">
              v7m<span className="logo-highlight">.org</span>
            </h2>
          </div>

          <ul className="footer-links" aria-label="Navegação do rodapé">
            <li>
              <a href="#sobre">Estrutura</a>
            </li>
            <li>
              <a href="#atuacao">Pilares</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>

          <div className="footer-legal">
            <p>&copy; {year} v7m.org. Todos os direitos reservados.</p>
            <div className="footer-policy-links">
              <a href="#termos">Termos de Uso</a>
              <a href="#privacidade">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
