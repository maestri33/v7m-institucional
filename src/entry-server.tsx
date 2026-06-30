import { renderToString } from 'react-dom/server'
import App from './App'
import { routes } from './routes'

// `hash` is the URL hash WITHOUT the leading "#". Pass the route's path
// (e.g. '/termos' → 'termos') so App renders the right page server-side.
// Without this, every prerendered HTML file ships the home stack — the
// legal pages only swap to the right content after JS hydrates.
export function render(hash: string = ''): string {
  return renderToString(<App ssrHash={hash} />)
}

export { routes }
