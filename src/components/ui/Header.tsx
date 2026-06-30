import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const ANCHORS = [
  { id: 'home', label: 'Início' },
  { id: 'educacao', label: 'Educação' },
  { id: 'afiliados', label: 'Afiliados' },
  { id: 'tech', label: 'Tech' },
  { id: 'engenharia', label: 'Engenharia' },
  { id: 'contato', label: 'Contato' },
  { id: 'carreiras', label: 'Carreiras' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)

  const closeMobile = () => {
    setMobileOpen(false)
    // Return focus to the toggle so keyboard users don't lose context.
    toggleButtonRef.current?.focus()
  }

  const handleAnchorClick = (anchor: string) => {
    setMobileOpen(false)
    window.location.assign(`#${anchor}`)
  }

  // Escape closes the mobile menu; outside click closes it too.
  useEffect(() => {
    if (!mobileOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (target && !document.querySelector('header')?.contains(target)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-[rgba(10,10,10,0.72)] backdrop-blur-xl',
        'border-b border-[rgba(255,255,255,0.08)]',
      )}
      aria-label="Cabeçalho principal"
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-3" aria-label="Voltar ao início">
          <img src="/logo.svg" alt="" className="h-8 w-auto" aria-hidden="true" />
          <span className="text-xl md:text-2xl font-extrabold tracking-tight">
            v7m<span className="text-gradient">.org</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6">
          {ANCHORS.map((anchor) => (
            <button
              key={anchor.id}
              type="button"
              onClick={() => handleAnchorClick(anchor.id)}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded"
            >
              {anchor.label}
            </button>
          ))}
        </nav>

        <button
          ref={toggleButtonRef}
          type="button"
          className="md:hidden p-2 text-[var(--text-secondary)] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMobileOpen((previous) => !previous)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Menu principal"
          className={cn(
            'md:hidden absolute top-full left-0 right-0',
            'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl',
            'border-b border-[rgba(255,255,255,0.08)]',
            'px-5 py-4',
          )}
        >
          <ul className="flex flex-col gap-1">
            {ANCHORS.map((anchor) => (
              <li key={anchor.id}>
                <button
                  type="button"
                  onClick={() => handleAnchorClick(anchor.id)}
                  className="w-full text-left text-base font-medium text-[var(--text-secondary)] hover:text-white transition-colors py-2.5 px-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] focus-visible:bg-[rgba(255,255,255,0.04)]"
                >
                  {anchor.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
