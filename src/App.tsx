import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { AuroraBackground } from './components/ui/AuroraBackground'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { Header } from './components/ui/Header'
import { LegalFooter } from './components/ui/LegalFooter'
import HeroSection from './components/sections/HeroSection'
import EducationSection from './components/sections/EducationSection'
import AffiliatesSection from './components/sections/AffiliatesSection'
import TechSection from './components/sections/TechSection'
import EngineeringSection from './components/sections/EngineeringSection'
import ContactSection from './components/sections/ContactSection'
import CareersFooterSection from './components/sections/CareersFooterSection'
import TermsOfUse from './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'

// Routing: hash-based with a path fallback (see readHash() below).
// Sections render as a plain stack — there is no @fullpage anymore.
function SkipLink() {
  // The .skip-link CSS class is already defined in src/index.css. Pressing
  // Tab on the page surfaces this link, which jumps the keyboard user
  // past the navigation and header into the main content.
  return (
    <a href="#main-content" className="skip-link">
      Pular para o conteúdo principal
    </a>
  )
}

function HomeStack() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">
        <HeroSection />
        <EducationSection />
        <AffiliatesSection />
        <TechSection />
        <EngineeringSection />
        <ContactSection />
        <CareersFooterSection />
      </main>
    </>
  )
}

function LegalHeader({ label }: { label: string }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.72)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]"
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-[var(--text-primary)] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          aria-label={`Voltar para ${label}`}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar para <span className="text-gradient font-bold">v7m.org</span>
        </a>
        <span className="hidden sm:inline text-sm text-[var(--text-secondary)]">{label}</span>
      </div>
    </header>
  )
}

function readHash() {
  if (typeof window === 'undefined') return ''
  // Prefer the URL hash (e.g. "/#termos"), but fall back to the path
  // (e.g. "/termos" with no hash) so direct-path access works the same
  // as hash-routed access. Without this, the static prerender renders
  // the legal content but hydration swaps it for HomeStack.
  const hash = window.location.hash.replace(/^#/, '').trim().toLowerCase()
  if (hash) return hash
  const path = window.location.pathname.replace(/^\//, '').toLowerCase()
  return path
}

export interface AppProps {
  /**
   * Hash string passed by the prerender step (`render(ssrHash)` in
   * entry-server.tsx). Lets the server pick the right page instead of
   * always rendering HomeStack. Unused in the browser.
   */
  ssrHash?: string
}

export default function App({ ssrHash }: AppProps = {}) {
  // App must react to hashchange, otherwise clicking an in-page link like
  // <a href="#home"> from /#termos only updates the URL bar — the user
  // stays stuck on the legal page. SSR safe via lazy init.
  const [hash, setHash] = useState<string>(() => ssrHash ?? readHash())

  useEffect(() => {
    const handler = () => setHash(readHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (hash === 'termos') {
    return (
      <ErrorBoundary>
        <SkipLink />
        <LegalHeader label="Termos de Uso" />
        <TermsOfUse />
        <LegalFooter />
      </ErrorBoundary>
    )
  }

  if (hash === 'privacidade') {
    return (
      <ErrorBoundary>
        <SkipLink />
        <LegalHeader label="Política de Privacidade" />
        <PrivacyPolicy />
        <LegalFooter />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <AuroraBackground />
      <HomeStack />
    </ErrorBoundary>
  )
}
