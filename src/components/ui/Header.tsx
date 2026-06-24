import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const ANCHORS = [
  { id: 'home', label: 'Início' },
  { id: 'educacao', label: 'Educação' },
  { id: 'afiliados', label: 'Afiliados' },
  { id: 'tech', label: 'Tech' },
  { id: 'engenharia', label: 'Engenharia' },
  { id: 'video', label: 'Vídeo' },
  { id: 'contato', label: 'Contato' },
  { id: 'carreiras', label: 'Carreiras' },
]

export interface HeaderProps {
  fullpageApi?: {
    moveTo: (anchor: string) => void
  } | null
}

export function Header({ fullpageApi }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleAnchorClick = (anchor: string) => {
    setMobileOpen(false)
    if (fullpageApi) {
      fullpageApi.moveTo(anchor)
      return
    }
    window.location.assign(`#${anchor}`)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-[rgba(10,10,10,0.72)] backdrop-blur-xl',
        'border-b border-[rgba(255,255,255,0.08)]',
      )}
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
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              {anchor.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-[var(--text-secondary)]"
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
          className={cn(
            'md:hidden absolute top-full left-0 right-0',
            'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl',
            'border-b border-[rgba(255,255,255,0.08)]',
            'px-5 py-4',
          )}
        >
          <ul className="flex flex-col gap-3">
            {ANCHORS.map((anchor) => (
              <li key={anchor.id}>
                <button
                  type="button"
                  onClick={() => handleAnchorClick(anchor.id)}
                  className="w-full text-left text-base font-medium text-[var(--text-secondary)] hover:text-white transition-colors py-2"
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
