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

  componentDidMount(): void {
    // ponytail: catch async errors (useEffect, event handlers) that React Error Boundaries miss
    this._onError = (e: ErrorEvent) => this.setState({ error: e.error || new Error(e.message) })
    this._onRejection = (e: PromiseRejectionEvent) => this.setState({ error: e.reason instanceof Error ? e.reason : new Error(String(e.reason)) })
    window.addEventListener('error', this._onError)
    window.addEventListener('unhandledrejection', this._onRejection)
  }

  componentWillUnmount(): void {
    if (this._onError) window.removeEventListener('error', this._onError)
    if (this._onRejection) window.removeEventListener('unhandledrejection', this._onRejection)
  }

  private _onError?: (e: ErrorEvent) => void
  private _onRejection?: (e: PromiseRejectionEvent) => void

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
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-semibold transition-all hover:bg-[var(--accent-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          >
            Voltar ao início
          </button>
        </main>
      )
    }

    return this.props.children
  }
}