import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#termos') setCurrentPage('termos');
      else if (hash === '#privacidade') setCurrentPage('privacidade');
      else setCurrentPage('home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, width: '100%',
        padding: '1.5rem 0',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 50
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img src="/logo.svg" alt="V7M Logo" style={{ height: '32px', width: 'auto' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.05em', color: 'white' }}>
              v7m<span style={{ color: 'var(--accent-primary)' }}>.org</span>
            </span>
          </a>
          {currentPage === 'home' ? (
            <a href="#contato" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Fale Conosco</a>
          ) : (
            <a href="#" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Voltar ao Início</a>
          )}
        </div>
      </nav>

      <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
  );
}

export default App;
