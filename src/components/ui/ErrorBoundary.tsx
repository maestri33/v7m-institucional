import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/**
 * Catches render-time throws anywhere in the tree and shows a static
 * fallback instead of leaving the user with a blank page. Errors are
 * logged to the console for now (no remote telemetry yet).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  private handleReset = () => {
    this.setState({ error: null })
    window.location.assign('/')
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <main
          id="main-content"
          className="container py-20 text-center"
          aria-labelledby="error-title"
        >
          <h1
            id="error-title"
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Algo deu errado.
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl mx-auto">
            Não conseguimos renderizar esta página. Tente voltar ao início —
            se o problema persistir, entre em contato pelo email abaixo.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--accent-primary)] text-[var(--near-black)] font-semibold transition-all hover:bg-[var(--accent-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          >
            Voltar ao início
          </button>
        </main>
      )
    }

    return this.props.children
  }
}