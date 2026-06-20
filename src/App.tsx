import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import PrivacyPolicy from './components/PrivacyPolicy'
import Services from './components/Services'
import TermsOfUse from './components/TermsOfUse'

const HOME_SECTION_IDS = new Set(['sobre', 'atuacao', 'contato'])

const getHeaderOffset = () => {
  const header = document.querySelector('.site-header')
  return header instanceof HTMLElement ? header.offsetHeight : 84
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Contact />
    </>
  )
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '').trim()

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    if (!HOME_SECTION_IDS.has(hash)) {
      return
    }

    const target = document.getElementById(hash)
    if (!target) {
      return
    }

    const navOffset = getHeaderOffset()
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
  }, [location])

  return null
}

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <ScrollManager />

      <a href="#conteudo-principal" className="skip-link">
        Pular para conteúdo principal
      </a>

      <nav className="site-header" aria-label="Navegação principal">
        <div className="container site-header-content">
          <Link to="/" className="logo-link" aria-label="Voltar para a página inicial">
            <img src="/logo.svg" alt="" className="logo-image" aria-hidden="true" />
            <span className="logo-wordmark">
              v7m<span className="logo-highlight">.org</span>
            </span>
          </Link>
          {isHome ? (
            <a href="#contato" className="nav-action">
              Fale Conosco
            </a>
          ) : (
            <Link to="/" className="nav-action">
              Voltar ao Início
            </Link>
          )}
        </div>
      </nav>

      <main id="conteudo-principal" className="main-layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/termos" element={<TermsOfUse />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
