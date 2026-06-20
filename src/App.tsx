import { useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import PrivacyPolicy from './components/PrivacyPolicy'
import Services from './components/Services'
import TermsOfUse from './components/TermsOfUse'

type Page = 'home' | 'termos' | 'privacidade'

const HOME_SECTION_IDS = new Set(['sobre', 'atuacao', 'contato'])

const getHashValue = () => window.location.hash.replace(/^#/, '').trim()

const getPageFromHash = (hash: string): Page => {
  if (hash === 'termos') return 'termos'
  if (hash === 'privacidade') return 'privacidade'
  return 'home'
}

const getHeaderOffset = () => {
  const header = document.querySelector('.site-header')
  return header instanceof HTMLElement ? header.offsetHeight : 84
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentHash, setCurrentHash] = useState('')

  useEffect(() => {
    const syncPageWithHash = () => {
      const hash = getHashValue()
      setCurrentPage(getPageFromHash(hash))
      setCurrentHash(hash)
    }

    window.addEventListener('hashchange', syncPageWithHash)
    syncPageWithHash()

    return () => window.removeEventListener('hashchange', syncPageWithHash)
  }, [])

  useEffect(() => {
    const hash = currentHash

    if (currentPage !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

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
  }, [currentHash, currentPage])

  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para conteúdo principal
      </a>

      <nav className="site-header" aria-label="Navegação principal">
        <div className="container site-header-content">
          <a href="#" className="logo-link" aria-label="Voltar para a página inicial">
            <img src="/logo.svg" alt="" className="logo-image" aria-hidden="true" />
            <span className="logo-wordmark">
              v7m<span className="logo-highlight">.org</span>
            </span>
          </a>
          {currentPage === 'home' ? (
            <a href="#contato" className="nav-action">
              Fale Conosco
            </a>
          ) : (
            <a href="#" className="nav-action">
              Voltar ao Início
            </a>
          )}
        </div>
      </nav>

      <main id="conteudo-principal" className="main-layout">
        {currentPage === 'home' && (
          <>
            <Hero />
            <About />
            <Services />
            <Contact />
          </>
        )}
        {currentPage === 'termos' && <TermsOfUse />}
        {currentPage === 'privacidade' && <PrivacyPolicy />}
      </main>

      <Footer />
    </>
  )
}

export default App
